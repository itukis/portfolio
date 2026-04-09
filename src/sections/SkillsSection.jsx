import { Code2, Layers, Brain, Shield, Terminal, BookOpen, ShieldAlert } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import { useLang } from "../context/LangContext";

const CATEGORY_ICONS = [Code2, Layers, Brain, Shield, Terminal, BookOpen];

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

const SkillsSection = () => {
  const { t } = useLang();
  const sk = t.skills;
  return (
    <section id="skills" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <SectionLabel icon={ShieldAlert} label={sk.label} />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">{sk.heading}<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
          <p className="text-sm text-zinc-600 mb-10">{sk.subheading}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sk.categories.map((cat, ci) => (
            <FadeIn key={cat.title} delay={0.04 + ci * 0.06}>
              <div className="skill-card" style={{ "--accent": cat.color }}>
                <div className="flex items-center gap-2.5 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}20` }}>
                    {(() => { const Icon = CATEGORY_ICONS[ci]; return <Icon size={14} style={{ color: cat.color }} />; })()}
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
};

export default SkillsSection;
