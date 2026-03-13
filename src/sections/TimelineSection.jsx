import { Terminal } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const timelineData = [
  { year: "2015.10", title: "プログラミング学習開始",          desc: "e-kagakuに入会し、e-gadgetを活用したプログラミングの基礎とモノづくりを学び始める。" },
  { year: "2019.xx", title: "琵琶湖環境プロジェクト参加",       desc: "e-kagakuにて環境データの収集・分析プロジェクトに参加。" },
  { year: "2020.xx", title: "成層圏探査とデータ分析",           desc: "百均アイテムとMATLABを活用した成層圏探査プロジェクトに参加。ハードウェアとデータ分析を経験。" },
  { year: "2024.03", title: "e-kagaku 卒業",                   desc: "基礎・応用課程を修了。Arduino, VBA, MATLABを用いた機械学習を習得。" },
  { year: "2024.04", title: "近畿大学 入学",                   desc: "情報学部 情報学科へ入学。より専門的なCS・情報工学の学習を開始。" },
  { year: "2024.05", title: "e-kagaku サポーター就任",          desc: "後進の育成のため、サポーターとして活動をスタート。" },
  { year: "2025.12", title: "近大ハッカソン 受賞",              desc: "学内ハッカソンにて『Kindai Innovation Award』を受賞。" },
  { year: "2026.02", title: "KC3Hack 参加 / Pitch Scout 開発", desc: "関西最大の学生ハッカソン KC3Hack に参加。5人チームでカラオケ音域解析アプリ『Pitch Scout』を開発し、バックエンドの音声処理パイプラインと地声/裏声分類MLモデルを担当。" },
];

const TimelineSection = () => (
  <section id="timeline" className="py-20 sm:py-28 px-5 sm:px-8">
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <SectionLabel icon={Terminal} label="TIMELINE" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">活動履歴<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
        <p className="text-sm text-zinc-600 mb-10">これまでの学習・開発実績</p>
      </FadeIn>

      <div className="relative pl-10 md:pl-12 space-y-8 md:space-y-10">
        <div className="timeline-line" />
        {timelineData.map((item, i) => (
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

export default TimelineSection;
