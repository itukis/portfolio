import { Terminal } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import { useLang } from "../context/LangContext";

const TimelineSection = () => {
  const { t } = useLang();
  const tl = t.timeline;
  return (
    <section id="timeline" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <SectionLabel icon={Terminal} label={tl.label} />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">{tl.heading}<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
          <p className="text-sm text-zinc-600 mb-10">{tl.subheading}</p>
        </FadeIn>

        <div className="relative pl-10 md:pl-12 space-y-8 md:space-y-10">
          <div className="timeline-line" />
          {tl.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="relative">
                <div className="absolute -left-[45px] top-1.5 md:-left-[53px] w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] z-10" />
                <div className="glass-card p-5 sm:p-6 hover:border-emerald-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                    <span className="mono text-xs sm:text-sm text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded inline-block w-fit font-semibold">{item.year}</span>
                    <h3 className="text-base sm:text-lg text-white font-medium">{item.title}</h3>
                  </div>
                  <p className="text-[0.85rem] sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
