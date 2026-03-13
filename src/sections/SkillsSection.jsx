import { Code2, Layers, Brain, Shield, Terminal, BookOpen, ShieldAlert } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const skillCategories = [
  { title: "Languages",    icon: Code2,      color: "#818cf8", items: [
    { name: "Java",              note: "メイン言語" },
    { name: "Python",            note: "基礎" },
    { name: "TypeScript / JS",   note: "基礎" },
    { name: "VBA",               note: "教材制作" },
    { name: "HTML / CSS",        note: null },
  ]},
  { title: "Frameworks",   icon: Layers,     color: "#a78bfa", items: [
    { name: "FastAPI",           note: null },
    { name: "Next.js",           note: "App Router" },
    { name: "scikit-learn",      note: null },
    { name: "React",             note: "基礎" },
    { name: "Tailwind CSS",      note: "基礎" },
  ]},
  { title: "AI / Audio",   icon: Brain,      color: "#c084fc", items: [
    { name: "機械学習",           note: "分類・回帰" },
    { name: "Demucs",            note: "音源分離" },
    { name: "CREPE",             note: "ピッチ検出" },
    { name: "音声信号処理",        note: null },
  ]},
  { title: "Security",     icon: Shield,     color: "#22d3ee", items: [
    { name: "サイバーセキュリティ", note: "学習中" },
    { name: "ネットワーク基礎",    note: null },
  ]},
  { title: "Tools & Infra", icon: Terminal,  color: "#34d399", items: [
    { name: "Git / GitHub",      note: "チーム開発" },
    { name: "Supabase",          note: "PostgreSQL / RLS" },
    { name: "VS Code",           note: null },
    { name: "Linux / CLI",       note: null },
    { name: "macOS / Windows",   note: null },
  ]},
  { title: "Other / Lang", icon: BookOpen,   color: "#fbbf24", items: [
    { name: "英語",               note: "TOEIC 750 / 英検2級 / GTEC 1093" },
    { name: "教材設計",           note: "VBAカリキュラム" },
    { name: "チーム開発",         note: "5人チーム" },
  ]},
];

const SkillsSection = () => (
  <section id="skills" className="py-20 sm:py-28 px-5 sm:px-8">
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <SectionLabel icon={ShieldAlert} label="SKILLS & LANGUAGES" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">スキルと技術スタック<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
        <p className="text-sm text-zinc-600 mb-10">現在使える技術と学習中の領域</p>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((cat, ci) => (
          <FadeIn key={cat.title} delay={0.04 + ci * 0.06}>
            <div className="skill-card" style={{ "--accent": cat.color }}>
              <div className="flex items-center gap-2.5 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}20` }}>
                  <cat.icon size={14} style={{ color: cat.color }} />
                </div>
                <h3 className="text-sm font-semibold text-zinc-200">{cat.title}</h3>
              </div>
              <div className="space-y-2.5">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 group">
                    <div className="flex items-center gap-2 min-w-0">
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cat.color, opacity: 0.7, flexShrink: 0, display: "inline-block" }} />
                      <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">{item.name}</span>
                    </div>
                    {item.note && (
                      <span className="text-[0.62rem] text-zinc-600 px-1.5 py-0.5 rounded min-w-0 text-right"
                        style={{ background: "rgba(255,255,255,0.02)", wordBreak: "keep-all", flexShrink: 1 }}>
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
);

export default SkillsSection;
