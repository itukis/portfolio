import { GraduationCap, MapPin, Search, Briefcase, FileCode, Trophy } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import { useLang } from "../context/LangContext";

const CARD_ICONS = [GraduationCap, MapPin, Search, Briefcase, Trophy];
const CARD_COLORS = ["#818cf8", "#f472b6", "#22d3ee", "#34d399", "#fbbf24"];

const AboutSection = () => {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="about" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <SectionLabel icon={FileCode} label={a.label} />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">{a.heading}<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
          <p className="text-sm text-zinc-600 mb-10">{a.subheading}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          <FadeIn delay={0.1} className="md:col-span-2">
            <div className="space-y-4 text-sm sm:text-[0.935rem] text-zinc-400 leading-relaxed">
              {a.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass-card p-5 space-y-3.5">
              {a.cards.map((item, i) => {
                const Icon = CARD_ICONS[i];
                const color = CARD_COLORS[i];
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}10`, border: `1px solid ${color}22` }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] text-zinc-600 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-zinc-300 font-medium">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
