import { Code2, Layers, Brain, Shield, Terminal, BookOpen, ShieldAlert } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

// level: 1=勉強中, 2=基礎, 3=実用, 4=熟練, 5=エキスパート
const skillCategories = [
  { title: "Languages",    icon: Code2,      color: "#818cf8", items: [
    { name: "Java",              note: "メイン言語", level: 4 },
    { name: "Python",            note: "基礎",       level: 2 },
    { name: "TypeScript / JS",   note: "基礎",       level: 2 },
    { name: "VBA",               note: "教材制作",   level: 3 },
    { name: "HTML / CSS",        note: null,         level: 2 },
  ]},
  { title: "Frameworks",   icon: Layers,     color: "#a78bfa", items: [
    { name: "FastAPI",           note: null,         level: 3 },
    { name: "Next.js",           note: "App Router", level: 3 },
    { name: "scikit-learn",      note: null,         level: 2 },
    { name: "React",             note: "基礎",       level: 2 },
    { name: "Tailwind CSS",      note: "基礎",       level: 2 },
  ]},
  { title: "AI / Audio",   icon: Brain,      color: "#c084fc", items: [
    { name: "機械学習",           note: "分類・回帰", level: 2 },
    { name: "Demucs",            note: "音源分離",   level: 3 },
    { name: "CREPE",             note: "ピッチ検出", level: 3 },
    { name: "音声信号処理",        note: null,        level: 2 },
  ]},
  { title: "Security",     icon: Shield,     color: "#22d3ee", items: [
    { name: "サイバーセキュリティ", note: "学習中",   level: 1 },
    { name: "ネットワーク基礎",    note: null,        level: 2 },
  ]},
  { title: "Tools & Infra", icon: Terminal,  color: "#34d399", items: [
    { name: "Git / GitHub",      note: "チーム開発",       level: 3 },
    { name: "Supabase",          note: "PostgreSQL / RLS", level: 3 },
    { name: "AWS",               note: "勉強中",           level: 1 },
    { name: "Google Cloud",      note: "勉強中",           level: 1 },
    { name: "Linux / CLI",       note: null,               level: 2 },
  ]},
  { title: "Other / Lang", icon: BookOpen,   color: "#fbbf24", items: [
    { name: "英語",               note: "TOEIC 750 / 英検2級", level: 3 },
    { name: "教材設計",           note: "VBAカリキュラム",      level: 3 },
    { name: "チーム開発",         note: "5人チーム",            level: 3 },
  ]},
];

const LevelDots = ({ level, color }) => (
  <div className="flex items-center gap-0.5 flex-shrink-0">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{
        display: "inline-block",
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: i <= level ? color : "rgba(255,255,255,0.08)",
        transition: "background 0.2s",
      }} />
    ))}
  </div>
);

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
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.note && (
                        <span className="text-[0.62rem] text-zinc-600 px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(255,255,255,0.02)", wordBreak: "keep-all" }}>
                          {item.note}
                        </span>
                      )}
                      <LevelDots level={item.level} color={cat.color} />
                    </div>
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
