import { useState, useEffect, useRef, useCallback } from "react";
import {
  GraduationCap, MapPin, Search, Briefcase, Mic, GitBranch,
  Code2, Brain, Shield, Wrench, BookOpen, Mail, Github,
  ChevronDown, Menu, X, ExternalLink, Terminal, Cpu,
  Database, Monitor, Globe, Layers, FileCode, Lock
} from "lucide-react";

// ═══════════════════════════════════════════════
// 西田鼓動 Portfolio
// ═══════════════════════════════════════════════

const WaveCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf, t = 0;
    const resize = () => {
      c.width = c.offsetWidth * 2;
      c.height = c.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const w = c.offsetWidth, h = c.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      [
        { a: 28, f: 0.006, s: 0.016, col: "rgba(129,140,248,0.10)", lw: 1.5 },
        { a: 20, f: 0.010, s: 0.012, col: "rgba(167,139,250,0.07)", lw: 1.2 },
        { a: 14, f: 0.015, s: 0.020, col: "rgba(196,181,253,0.05)", lw: 0.8 },
      ].forEach(v => {
        ctx.beginPath();
        ctx.strokeStyle = v.col;
        ctx.lineWidth = v.lw;
        for (let x = 0; x < w; x += 2) {
          const y = h / 2 + Math.sin(x * v.f + t * v.s) * v.a + Math.sin(x * v.f * 1.7 + t * v.s * 0.5) * v.a * 0.3;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />;
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
};

const SectionLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "rgba(129,140,248,0.1)" }}>
      <Icon size={13} style={{ color: "#818cf8" }} />
    </div>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 500, color: "#818cf8", letterSpacing: "0.12em" }}>
      {label}
    </span>
  </div>
);

const Tag = ({ children, glow = false }) => (
  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md transition-all" style={{
    background: glow ? "rgba(129,140,248,0.1)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${glow ? "rgba(129,140,248,0.2)" : "rgba(255,255,255,0.06)"}`,
    color: glow ? "#a5b4fc" : "#a1a1aa",
  }}>{children}</span>
);

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("hero");
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    for (const id of ["contact", "skills", "projects", "about", "hero"]) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) { setActiveNav(id); break; }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenu(false); };
  const navItems = [{ id: "about", label: "About" }, { id: "projects", label: "Projects" }, { id: "skills", label: "Skills" }, { id: "contact", label: "Contact" }];

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      color: "#818cf8",
      items: [
        { name: "Java", note: "メイン言語" },
        { name: "Python", note: "基礎" },
        { name: "TypeScript / JS", note: "基礎" },
        { name: "VBA", note: "教材制作" },
        { name: "HTML / CSS", note: null },
      ],
    },
    {
      title: "Frameworks",
      icon: Layers,
      color: "#a78bfa",
      items: [
        { name: "FastAPI", note: null },
        { name: "scikit-learn", note: null },
        { name: "React", note: "基礎" },
        { name: "Tailwind CSS", note: "基礎" },
      ],
    },
    {
      title: "AI / Audio",
      icon: Brain,
      color: "#c084fc",
      items: [
        { name: "機械学習", note: "分類・回帰" },
        { name: "Demucs", note: "音源分離" },
        { name: "CREPE", note: "ピッチ検出" },
        { name: "音声信号処理", note: null },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      color: "#22d3ee",
      items: [
        { name: "サイバーセキュリティ", note: "学習中" },
        { name: "ネットワーク基礎", note: null },
      ],
    },
    {
      title: "Tools & Infra",
      icon: Terminal,
      color: "#34d399",
      items: [
        { name: "Git / GitHub", note: "チーム開発" },
        { name: "VS Code", note: null },
        { name: "Linux / CLI", note: null },
        { name: "macOS / Windows", note: null },
      ],
    },
    {
      title: "Other",
      icon: BookOpen,
      color: "#fbbf24",
      items: [
        { name: "教材設計", note: "VBAカリキュラム" },
        { name: "チーム開発", note: "5人チーム" },
        { name: "日本語 / 英語", note: null },
      ],
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Noto+Sans+JP:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
        body{font-family:'Outfit','Noto Sans JP',sans-serif;background:#08080c;color:#d4d4d8;line-height:1.65;overflow-x:hidden}
        ::selection{background:rgba(129,140,248,0.25);color:#fff}
        .mono{font-family:'JetBrains Mono',monospace}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .cursor-blink{animation:blink 1s step-end infinite}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#08080c}
        ::-webkit-scrollbar-thumb{background:#27272a;border-radius:9px}
        .glass-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:16px;backdrop-filter:blur(4px)}
        .glass-card:hover{border-color:rgba(255,255,255,0.1);background:rgba(255,255,255,0.03)}
        .divider{height:1px;background:linear-gradient(90deg,transparent 5%,rgba(129,140,248,0.15) 30%,rgba(167,139,250,0.12) 70%,transparent 95%)}
        .gradient-text{background:linear-gradient(135deg,#e0e7ff 0%,#a5b4fc 40%,#c4b5fd 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .icon-glow{filter:drop-shadow(0 0 6px currentColor)}
      `}</style>

      <div style={{ background: "#08080c", minHeight: "100vh" }}>

        {/* ─── Nav ─── */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
          background: scrollY > 60 ? "rgba(8,8,12,0.85)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.04)" : "none",
        }}>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <button onClick={() => go("hero")} className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors" style={{ background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.15)" }}>
                <Terminal size={14} style={{ color: "#818cf8" }} />
              </div>
              <span className="mono text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">K.Nishida</span>
            </button>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(n => (
                <button key={n.id} onClick={() => go(n.id)}
                  className="px-3.5 py-1.5 rounded-lg text-sm transition-all"
                  style={{
                    color: activeNav === n.id ? "#e4e4e7" : "#71717a",
                    fontWeight: activeNav === n.id ? 500 : 400,
                    background: activeNav === n.id ? "rgba(129,140,248,0.08)" : "transparent",
                  }}>
                  {n.label}
                </button>
              ))}
            </div>
            <button className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {mobileMenu && (
            <div className="md:hidden px-5 pb-5 pt-1 space-y-0.5" style={{ background: "rgba(8,8,12,0.97)", backdropFilter: "blur(20px)" }}>
              {navItems.map(n => (
                <button key={n.id} onClick={() => go(n.id)}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all">
                  {n.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* ─── Hero ─── */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-5">
          <WaveCanvas />
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl" style={{ background: "#4f46e5", opacity: 0.08, top: "8%", left: "5%", transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.015}px)` }} />
          <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full blur-3xl" style={{ background: "#c026d3", opacity: 0.06, bottom: "12%", right: "8%", transform: `translate(${-scrollY * 0.015}px, ${-scrollY * 0.02}px)` }} />

          <div className="relative z-10 max-w-2xl text-center">
            <FadeIn delay={0.05}>
              <p className="mono text-xs sm:text-sm mb-5" style={{ color: "#818cf8", letterSpacing: "0.08em" }}>
                &gt; hello_world<span className="cursor-blink">_</span>
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                西田 鼓動
              </h1>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="text-base sm:text-lg text-zinc-500 mb-2">Kanade Nishida</p>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p className="text-sm sm:text-base text-zinc-400 mb-10 leading-relaxed max-w-md mx-auto">
                大学3年生（情報系）｜サイバーセキュリティ × 機械学習に興味のあるエンジニア
              </p>
            </FadeIn>
            <FadeIn delay={0.45}>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => go("projects")} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:brightness-110 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.25)" }}>
                  Projects
                </button>
                <button onClick={() => go("contact")} className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/[0.06] active:scale-95"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#a1a1aa" }}>
                  Contact
                </button>
              </div>
            </FadeIn>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30 animate-bounce">
            <ChevronDown size={20} />
          </div>
        </section>

        <div className="divider" />

        {/* ─── About ─── */}
        <section id="about" className="py-20 sm:py-28 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <SectionLabel icon={FileCode} label="ABOUT" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">自己紹介</h2>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              <FadeIn delay={0.1} className="md:col-span-2">
                <div className="space-y-4 text-sm sm:text-[0.935rem] text-zinc-400 leading-relaxed">
                  <p>
                    大阪在住の情報系大学3年生です。サイバーセキュリティと機械学習に興味があり、
                    チーム開発でカラオケ向けの音域解析アプリ「Pitch Scout」を開発しています。
                  </p>
                  <p>
                    Pitch Scoutではバックエンドの音声処理パイプラインや
                    機械学習モデルの設計・学習を主に担当しています。
                    また、プログラミング教育にも関わっており、VBA教材の設計・制作も行っています。
                  </p>
                  <p>
                    現在、セキュリティやAI/MLの分野でインターンシップを探しています。
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="glass-card p-5 space-y-3.5">
                  {[
                    { icon: GraduationCap, label: "学年", value: "大学3年（情報系）", color: "#818cf8" },
                    { icon: MapPin, label: "所在地", value: "大阪", color: "#f472b6" },
                    { icon: Search, label: "興味", value: "Security / ML", color: "#22d3ee" },
                    { icon: Briefcase, label: "状況", value: "インターン探し中", color: "#34d399" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                        <item.icon size={14} style={{ color: item.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.65rem] text-zinc-600 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm text-zinc-300 font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── Projects ─── */}
        <section id="projects" className="py-20 sm:py-28 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <SectionLabel icon={Cpu} label="PROJECTS" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">プロジェクト</h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="glass-card overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
                {/* Gradient accent */}
                <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #6366f1, #a855f7, #ec4899, transparent)" }} />

                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))", border: "1px solid rgba(129,140,248,0.15)" }}>
                      <Mic size={22} style={{ color: "#a5b4fc" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Pitch Scout</h3>
                        <span className="px-2 py-0.5 rounded-md text-[0.65rem] font-medium uppercase tracking-wider"
                          style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)", color: "#6ee7b7" }}>
                          In Progress
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500">AI-Powered Karaoke Song Recommender</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.12)", color: "#a5b4fc" }}>
                        <Database size={11} /> バックエンド / ML担当
                      </span>
                      <span className="text-xs text-zinc-600">2025.12 —</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    声を録音するだけでAIが音域を分析し、自分に合ったカラオケ曲をレコメンドするWebアプリ。
                    5人チームで開発。バックエンドの音声処理パイプラインと機械学習モデルを主に担当。
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <GitBranch size={13} className="text-zinc-600" />
                      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">担当・取り組み</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Demucsによるボーカル自動分離パイプライン構築",
                        "CREPEによるピッチ検出・精度改善",
                        "地声/裏声分類MLモデルの設計・学習",
                        "FastAPIでのバックエンドAPI設計・実装",
                        "音声前処理（変換・サンプリングレート調整）",
                      ].map((text, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-zinc-400 py-1">
                          <ChevronDown size={12} className="mt-1 flex-shrink-0 rotate-[-90deg]" style={{ color: "#818cf8" }} />
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {["Python", "FastAPI", "Demucs", "CREPE", "scikit-learn", "Git/GitHub"].map(t => (
                      <Tag key={t} glow>{t}</Tag>
                    ))}
                  </div>

                  {/* Link */}
                  <a href="https://github.com/kc3hack/2026_team11" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3 group" style={{ color: "#a5b4fc" }}>
                    <Github size={15} />
                    <span>View on GitHub</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-6 rounded-2xl p-8 text-center transition-colors" style={{ border: "1px dashed rgba(255,255,255,0.06)" }}>
                <Layers size={20} className="mx-auto mb-2 text-zinc-700" />
                <p className="text-zinc-600 text-sm">他のプロジェクトも追加予定</p>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="divider" />

        {/* ─── Skills ─── */}
        <section id="skills" className="py-20 sm:py-28 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <SectionLabel icon={Code2} label="SKILLS" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">技術スタック</h2>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories.map((cat, ci) => (
                <FadeIn key={cat.title} delay={0.04 + ci * 0.06}>
                  <div className="glass-card p-5 h-full transition-all duration-200">
                    <div className="flex items-center gap-2.5 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}18` }}>
                        <cat.icon size={14} style={{ color: cat.color }} />
                      </div>
                      <h3 className="text-sm font-semibold text-zinc-200">{cat.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {cat.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 group">
                          <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{item.name}</span>
                          {item.note && (
                            <span className="text-[0.65rem] text-zinc-600 px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.02)" }}>
                              {item.note}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── Contact ─── */}
        <section id="contact" className="py-20 sm:py-28 px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <SectionLabel icon={Mail} label="CONTACT" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">お問い合わせ</h2>
              <p className="text-sm text-zinc-500 mb-10 max-w-md mx-auto">
                インターンのご相談やお仕事のご依頼など、お気軽にご連絡ください。
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href="mailto:kanaden0821@gmail.com"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110 hover:shadow-lg active:scale-[0.97]"
                  style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)", boxShadow: "0 4px 24px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                  <Mail size={16} /> メールを送る
                </a>
                <a href="https://github.com/itukis" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/[0.06] active:scale-[0.97]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#d4d4d8" }}>
                  <Github size={16} /> GitHub
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-8 px-5" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="mono text-xs text-zinc-700">© 2026 Kanade Nishida</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/itukis" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-zinc-400 transition-colors">
                <Github size={15} />
              </a>
              <a href="mailto:kanaden0821@gmail.com" className="text-zinc-700 hover:text-zinc-400 transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
