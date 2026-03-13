import { useState, useEffect, useCallback, useRef } from "react";
import { Terminal, Mail, Menu, X, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

import HeroSection     from "./sections/HeroSection";
import AboutSection    from "./sections/AboutSection";
import TimelineSection from "./sections/TimelineSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection   from "./sections/SkillsSection";
import ContactSection  from "./sections/ContactSection";
import LoadingScreen   from "./components/LoadingScreen";

const NAV_ITEMS = [
  { id: "about",    label: "About" },
  { id: "timeline", label: "Timeline" },
  { id: "projects", label: "Projects" },
  { id: "skills",   label: "Skills" },
  { id: "contact",  label: "Contact" },
];

const SECTION_ORDER = ["hero", "about", "timeline", "projects", "skills", "contact"];
const SCROLL_IDS    = ["contact", "skills", "projects", "timeline", "about", "hero"];

export default function Portfolio() {
  const [scrollY,       setScrollY]       = useState(0);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [activeNav,     setActiveNav]     = useState("hero");
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenu,    setMobileMenu]    = useState(false);
  const [showTop,       setShowTop]       = useState(false);
  const [swipeHint,     setSwipeHint]     = useState(null);
  const [loaded, setLoaded] = useState(() => {
    try { return !!sessionStorage.getItem("pf-loaded"); } catch { return true; }
  });
  const [banner, setBanner] = useState(() => {
    try { return !sessionStorage.getItem("pf-banner"); } catch { return false; }
  });

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isSwiping   = useRef(false);

  const handleLoaded = useCallback(() => {
    try { sessionStorage.setItem("pf-loaded", "1"); } catch {}
    setLoaded(true);
  }, []);

  const dismissBanner = useCallback(() => {
    try { sessionStorage.setItem("pf-banner", "1"); } catch {}
    setBanner(false);
  }, []);

  /* ── Scroll handling ── */
  const handleScroll = useCallback(() => {
    const y   = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setScrollY(y);
    setScrollPct(max > 0 ? (y / max) * 100 : 0);
    setShowTop(y > 400);

    for (const id of SCROLL_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) {
        setActiveNav(id);
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Navigation ── */
  const go = useCallback(id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  }, []);

  /* ── Swipe navigation (mobile) ── */
  const goRelative = useCallback(dir => {
    const idx  = SECTION_ORDER.indexOf(activeSection);
    const next = SECTION_ORDER[idx + dir];
    if (next) go(next);
    setSwipeHint(dir === 1 ? "left" : "right");
    setTimeout(() => setSwipeHint(null), 600);
  }, [activeSection, go]);

  /* ── Touch events ── */
  useEffect(() => {
    const onTouchStart = e => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current   = false;
    };
    const onTouchMove = e => {
      if (touchStartX.current === null) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (!isSwiping.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        isSwiping.current = true;
      }
    };
    const onTouchEnd = e => {
      if (!isSwiping.current || touchStartX.current === null) {
        touchStartX.current = null;
        return;
      }
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      isSwiping.current   = false;
      if (Math.abs(dx) < 50) return;
      goRelative(dx < 0 ? 1 : -1);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove",  onTouchMove,  { passive: true });
    document.addEventListener("touchend",   onTouchEnd);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove",  onTouchMove);
      document.removeEventListener("touchend",   onTouchEnd);
    };
  }, [goRelative]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === "ArrowRight") goRelative(1);
      if (e.key === "ArrowLeft")  goRelative(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goRelative]);

  const sectionIdx = SECTION_ORDER.indexOf(activeSection);
  const hasPrev    = sectionIdx > 0;
  const hasNext    = sectionIdx < SECTION_ORDER.length - 1;

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleLoaded} />}

      <div style={{ background: "#080810", minHeight: "100vh" }}>

        {/* ─── Recruiting banner ─── */}
        {banner && (
          <div className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-center gap-3 px-4"
            style={{ height: 36, background: "rgba(52,211,153,0.06)", borderBottom: "1px solid rgba(52,211,153,0.12)", backdropFilter: "blur(12px)" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot flex-shrink-0" style={{ background: "#34d399", display: "inline-block" }} />
            <span className="text-xs font-medium" style={{ color: "#6ee7b7", fontFamily: "'JetBrains Mono',monospace" }}>
              現在インターン募集中 — バックエンド / ML / セキュリティ分野
            </span>
            <button onClick={dismissBanner} className="ml-auto text-zinc-600 hover:text-zinc-400 transition-colors" aria-label="閉じる">
              <X size={14} />
            </button>
          </div>
        )}

        {/* ─── Scroll progress bar ─── */}
        <div className="fixed left-0 z-[60] h-[2px] pointer-events-none transition-all duration-150"
          style={{
            top: banner ? 36 : 0,
            width: `${scrollPct}%`,
            background: "linear-gradient(90deg, #818cf8, #34d399)",
            boxShadow: "0 0 8px rgba(52,211,153,0.6)",
          }}
        />

        {/* ─── Nav ─── */}
        <nav className="fixed left-0 right-0 z-50 transition-all duration-300"
          style={{
            top: banner ? 36 : 0,
            background:     scrollY > 60 ? "rgba(8,8,16,0.88)" : "transparent",
            backdropFilter: scrollY > 60 ? "blur(20px) saturate(180%)" : "none",
            borderBottom:   scrollY > 60 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <button onClick={() => go("hero")} className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.18)" }}>
                <Terminal size={14} style={{ color: "#818cf8" }} />
              </div>
              <span className="mono text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">K.Nishida</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(n => (
                <button key={n.id} onClick={() => go(n.id)}
                  className="px-3.5 py-1.5 rounded-lg text-sm transition-all"
                  style={{
                    color:      activeNav === n.id ? "#e4e4e7" : "#71717a",
                    fontWeight: activeNav === n.id ? 500 : 400,
                    background: activeNav === n.id ? "rgba(129,140,248,0.09)" : "transparent",
                  }}>
                  {n.label}
                </button>
              ))}
            </div>

            <button className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {mobileMenu && (
            <div className="md:hidden px-5 pb-5 pt-1 space-y-0.5"
              style={{ background: "rgba(8,8,16,0.97)", backdropFilter: "blur(20px)" }}>
              {NAV_ITEMS.map(n => (
                <button key={n.id} onClick={() => go(n.id)}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all">
                  {n.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* ─── Sections ─── */}
        <div style={{ paddingTop: banner ? 36 : 0 }}>
          <HeroSection scrollY={scrollY} go={go} />
          <div className="divider" />
          <AboutSection />
          <div className="divider" />
          <TimelineSection />
          <div className="divider" />
          <ProjectsSection />
          <div className="divider" />
          <SkillsSection />
          <div className="divider" />
          <ContactSection />
        </div>

        {/* ─── Footer ─── */}
        <footer className="py-8 px-5" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="mono text-xs text-zinc-700">© 2026 Kanade Nishida</p>
            <a href="https://mail.google.com/mail/?view=cm&to=kanaden0821@gmail.com"
              target="_blank" rel="noopener noreferrer"
              className="text-zinc-700 hover:text-zinc-400 transition-colors">
              <Mail size={15} />
            </a>
          </div>
        </footer>

        {/* ─── Back to top ─── */}
        <button
          onClick={() => go("hero")}
          className="fixed bottom-6 right-5 z-50 md:hidden flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: 40, height: 40,
            background: "rgba(129,140,248,0.12)",
            border: "1px solid rgba(129,140,248,0.25)",
            backdropFilter: "blur(12px)",
            opacity:   showTop ? 1 : 0,
            transform: showTop ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
            pointerEvents: showTop ? "auto" : "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          aria-label="トップへ戻る"
        >
          <ChevronUp size={18} style={{ color: "#a5b4fc" }} />
        </button>

        {/* ─── Swipe section indicator (mobile) ─── */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center gap-3 pointer-events-none"
          style={{
            opacity: scrollY > 100 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <ChevronLeft size={14}
            style={{ color: hasPrev ? "rgba(129,140,248,0.5)" : "transparent",
                     transition: "color 0.2s" }} />

          <div className="flex items-center gap-1.5">
            {SECTION_ORDER.map((id, i) => (
              <span key={id} style={{
                width:  i === sectionIdx ? 16 : 5,
                height: 5,
                borderRadius: 9999,
                background: i === sectionIdx ? "#818cf8" : "rgba(129,140,248,0.25)",
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                display: "inline-block",
              }} />
            ))}
          </div>

          <ChevronRight size={14}
            style={{ color: hasNext ? "rgba(129,140,248,0.5)" : "transparent",
                     transition: "color 0.2s" }} />
        </div>

        {/* ─── Swipe flash feedback ─── */}
        {swipeHint && (
          <div className="fixed inset-0 pointer-events-none z-40 md:hidden flex items-center"
            style={{ justifyContent: swipeHint === "left" ? "flex-end" : "flex-start" }}>
            <div style={{
              padding: "8px 12px",
              margin: "0 20px",
              background: "rgba(129,140,248,0.15)",
              border: "1px solid rgba(129,140,248,0.3)",
              borderRadius: 10,
              backdropFilter: "blur(8px)",
              animation: "fadeout 0.6s ease forwards",
            }}>
              {swipeHint === "left"
                ? <ChevronRight size={18} style={{ color: "#a5b4fc" }} />
                : <ChevronLeft  size={18} style={{ color: "#a5b4fc" }} />}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
