import { useState } from "react";
import { Mic, GitBranch, Database, Layers, Zap, ExternalLink, CalendarDays, Server, Cpu, ChevronDown } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import Tag from "../components/Tag";
import { useLang } from "../context/LangContext";

/* ── Accordion ── */
const Accordion = ({ icon: Icon, label, openLabel, closedLabel, color = "#818cf8", children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2.5 w-full text-left group"
        style={{
          background: open ? `${color}0d` : "rgba(255,255,255,0.02)",
          border: `1px solid ${open ? `${color}30` : "rgba(255,255,255,0.07)"}`,
          borderRadius: 10,
          cursor: "pointer",
          padding: "10px 14px",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        <Icon size={14} style={{ color: open ? color : "#71717a", transition: "color 0.2s", flexShrink: 0 }} />
        <p className="text-xs font-semibold flex-1 transition-colors"
          style={{ color: open ? color : "#a1a1aa", letterSpacing: "0.04em" }}>
          {label}
        </p>
        <span className="text-[0.6rem] mr-1 transition-colors" style={{ color: open ? color : "#52525b" }}>
          {open ? openLabel : closedLabel}
        </span>
        <ChevronDown size={14} style={{
          color: open ? color : "#52525b",
          transition: "transform 0.25s, color 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          flexShrink: 0,
        }} />
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? 1000 : 0,
        opacity: open ? 1 : 0,
        transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s",
        marginTop: open ? 8 : 0,
      }}>
        {children}
      </div>
    </div>
  );
};

/* ── Pitch Scout ── */
const PitchScout = () => {
  const { t } = useLang();
  const p = t.projects.pitchScout;
  const acc = t.projects;
  return (
    <div className="project-card overflow-hidden transition-all duration-300 hover:translate-y-[-3px]"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px", backdropFilter: "blur(4px)" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #6366f1 20%, #a855f7 50%, #ec4899 80%, transparent)" }} />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))", border: "1px solid rgba(129,140,248,0.18)" }}>
            <Mic size={22} style={{ color: "#a5b4fc" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1 cursor-default">
              <h3 className="text-xl sm:text-2xl font-bold text-white glitch-hover transition-colors">Pitch Scout</h3>
              <span className="px-2 py-0.5 rounded-md text-[0.65rem] font-medium uppercase tracking-wider pulse-dot"
                style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)", color: "#6ee7b7" }}>
                In Progress
              </span>
            </div>
            <p className="text-sm text-zinc-500 font-medium">{p.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.14)", color: "#a5b4fc" }}>
              <Database size={11} /> {p.roleBadge}
            </span>
            <span className="text-xs text-zinc-600 mono">2026.02 —</span>
          </div>
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed mb-6">{p.description}</p>

        {/* Responsibilities */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch size={13} className="text-zinc-600" />
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{p.roleLabel}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {p.tasks.map((text, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-zinc-400 py-1">
                <span style={{ color: "#818cf8", marginTop: 3, flexShrink: 0 }}>▸</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={13} className="text-zinc-600" />
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{p.techLabel}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {p.techStack.map(({ layer, tech }) => (
              <div key={layer} className="flex items-baseline gap-2 text-xs py-0.5">
                <span className="text-zinc-600 flex-shrink-0 w-16">{layer}</span>
                <span className="text-zinc-400 mono">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div className="mb-6 rounded-xl px-4 py-3" style={{ background: "rgba(129,140,248,0.04)", border: "1px solid rgba(129,140,248,0.10)" }}>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5">{p.pipelineLabel}</p>
          <div className="flex flex-wrap items-center gap-1 text-xs mono" style={{ color: "#71717a" }}>
            {p.pipeline.map(({ label, color }, i) => (
              <span key={label} className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md text-[0.65rem]"
                  style={{ background: color ? `${color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${color ? `${color}20` : "rgba(255,255,255,0.06)"}`, color: color || "#71717a" }}>
                  {label}
                </span>
                {i < p.pipeline.length - 1 && <span style={{ color: "#3f3f46" }}>→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Details accordion */}
        <Accordion icon={Zap} label={p.detailsLabel} openLabel={acc.accordionOpen} closedLabel={acc.accordionClosed} color="#818cf8">
          <div className="space-y-2.5">
            {p.details.map(({ title, desc }) => (
              <div key={title} className="rounded-lg px-3.5 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-xs font-semibold text-zinc-300 mb-1">{title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Accordion>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {["Python", "FastAPI", "MelBandRoformers", "pyworld", "DeepFilterNet", "scikit-learn", "Supabase", "SQLite", "Git/GitHub"].map(t => (
            <Tag key={t} glow>{t}</Tag>
          ))}
        </div>

        <a href="https://pitch-scout.vercel.app/" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3" style={{ color: "#34d399" }}>
          <ExternalLink size={15} />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  );
};

/* ── Smart Schedule ── */
const SmartSchedule = () => {
  const { t } = useLang();
  const s = t.projects.smartSchedule;
  const acc = t.projects;
  return (
    <div className="mt-5 project-card overflow-hidden transition-all duration-300 hover:translate-y-[-3px]"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px", backdropFilter: "blur(4px)" }}>
      <div className="smart-bar" style={{ height: 2 }} />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(6,182,212,0.18)" }}>
            <CalendarDays size={22} style={{ color: "#67e8f9" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1 cursor-default">
              <h3 className="text-xl sm:text-2xl font-bold text-white glitch-hover transition-colors">Smart Schedule</h3>
              <span className="px-2 py-0.5 rounded-md text-[0.65rem] font-medium uppercase tracking-wider pulse-dot"
                style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)", color: "#67e8f9" }}>
                In Progress
              </span>
            </div>
            <p className="text-sm text-zinc-500 font-medium">{s.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.14)", color: "#6ee7b7" }}>
              <Server size={11} /> {s.roleBadge}
            </span>
            <span className="text-xs text-zinc-600 mono">2026.03 —</span>
          </div>
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed mb-6">{s.description}</p>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={13} className="text-zinc-600" />
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{s.techLabel}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {s.techStack.map(({ layer, tech }) => (
              <div key={layer} className="flex items-baseline gap-2 text-xs py-0.5">
                <span className="text-zinc-600 flex-shrink-0 w-16">{layer}</span>
                <span className="text-zinc-400 mono">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data flow */}
        <div className="mb-6 rounded-xl px-4 py-3" style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.10)" }}>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5">{s.dataFlowLabel}</p>
          <div className="flex flex-wrap items-center gap-1 text-xs mono" style={{ color: "#71717a" }}>
            {s.dataFlow.map(({ label, color }, i) => (
              <span key={label} className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md text-[0.65rem]"
                  style={{ background: color ? `${color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${color ? `${color}20` : "rgba(255,255,255,0.06)"}`, color: color || "#71717a" }}>
                  {label}
                </span>
                {i < s.dataFlow.length - 1 && <span style={{ color: "#3f3f46" }}>→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch size={13} className="text-zinc-600" />
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{s.featuresLabel}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {s.features.map((text, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-zinc-400 py-1">
                <span style={{ color: "#06b6d4", marginTop: 3, flexShrink: 0 }}>▸</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Design accordion */}
        <Accordion icon={Zap} label={s.detailsLabel} openLabel={acc.accordionOpen} closedLabel={acc.accordionClosed} color="#06b6d4">
          <div className="space-y-2.5">
            {s.details.map(({ title, desc }) => (
              <div key={title} className="rounded-lg px-3.5 py-3" style={{ background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.08)" }}>
                <p className="text-xs font-semibold text-zinc-300 mb-1">{title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Accordion>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {["Next.js 14", "TypeScript", "Supabase", "NextAuth.js", "Tailwind CSS", "shadcn/ui", "Google API", "PWA"].map(tag => (
            <span key={tag} className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md"
              style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.16)", color: "#67e8f9" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Screenshot */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(6,182,212,0.15)" }}>
          <img src={`${process.env.PUBLIC_URL}/smart-schedule-screenshot.png`} alt="Smart Schedule screenshot"
            className="w-full object-cover object-top"
            style={{ maxHeight: 280, display: "block" }} />
        </div>
      </div>
    </div>
  );
};

/* ── Section ── */
const ProjectsSection = () => {
  const { t } = useLang();
  const pr = t.projects;
  return (
    <section id="projects" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <SectionLabel icon={Cpu} label={pr.label} />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">{pr.heading}<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
          <p className="text-sm text-zinc-600 mb-10">{pr.subheading}</p>
        </FadeIn>
        <FadeIn delay={0.1}><PitchScout /></FadeIn>
        <FadeIn delay={0.2}><SmartSchedule /></FadeIn>
      </div>
    </section>
  );
};

export default ProjectsSection;
