import { GraduationCap, MapPin, Zap, ChevronDown } from "lucide-react";
import FadeIn from "../components/FadeIn";
import TypewriterText from "../components/TypewriterText";
import WaveCanvas from "../components/WaveCanvas";
import FloatingCode from "../components/FloatingCode";

const HeroSection = ({ scrollY, go }) => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-5">
    <div className="dot-grid absolute inset-0 pointer-events-none" style={{
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
    }} />
    <div className="noise" />
    <WaveCanvas />
    <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ background: "#4f46e5", opacity: 0.1, width: 420, height: 420, top: "5%", left: "3%", transform: `translate(${scrollY * 0.02}px,${scrollY * 0.015}px)` }} />
    <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ background: "#c026d3", opacity: 0.07, width: 360, height: 360, bottom: "10%", right: "6%", transform: `translate(${-scrollY * 0.015}px,${-scrollY * 0.02}px)` }} />
    <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ background: "#06b6d4", opacity: 0.05, width: 300, height: 300, top: "40%", right: "20%", transform: `translate(${scrollY * 0.01}px,0)` }} />

    <FloatingCode />

    <div className="relative z-10 max-w-2xl text-center lg:text-left lg:mr-auto lg:ml-[6%] xl:ml-[8%]">
      <FadeIn delay={0}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
          style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.18)" }}>
          <span className="pulse-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#34d399", display: "inline-block" }} />
          <span className="text-xs font-medium" style={{ color: "#6ee7b7", fontFamily: "'JetBrains Mono',monospace" }}>
            インターン募集中
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}><TypewriterText /></FadeIn>

      <FadeIn delay={0.15}>
        <h1 className="animated-gradient-text text-5xl sm:text-6xl md:text-7xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          西田 鼓動
        </h1>
      </FadeIn>

      <FadeIn delay={0.25}>
        <p className="text-base sm:text-lg text-zinc-500 mb-3 mono text-sweep" style={{ letterSpacing: "0.05em" }}>Kanade Nishida</p>
      </FadeIn>

      <FadeIn delay={0.32}>
        <p className="text-sm sm:text-[0.95rem] text-zinc-400 mb-8 leading-relaxed max-w-md lg:max-w-none mx-auto lg:mx-0">
          大学2年生（情報系）｜バックエンドエンジニア志望｜サイバーセキュリティ × 機械学習に興味
        </p>
      </FadeIn>

      <FadeIn delay={0.38}>
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-9">
          {[
            { icon: GraduationCap, text: "2年生", color: "#818cf8" },
            { icon: MapPin, text: "大阪", color: "#f472b6" },
            { icon: Zap, text: "Security / ML", color: "#22d3ee" },
          ].map(({ icon: Icon, text, color }) => (
            <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: `${color}09`, border: `1px solid ${color}20`, color }}>
              <Icon size={11} />{text}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.45}>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          <button onClick={() => go("projects")}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
            Projects →
          </button>
          <button onClick={() => go("contact")}
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/[0.06] active:scale-95"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", color: "#a1a1aa" }}>
            Contact
          </button>
        </div>
      </FadeIn>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-25 animate-bounce">
      <ChevronDown size={20} />
    </div>
  </section>
);

export default HeroSection;
