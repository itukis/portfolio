import { GraduationCap, MapPin, Search, Briefcase, FileCode } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const AboutSection = () => (
  <section id="about" className="py-20 sm:py-28 px-5 sm:px-8">
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <SectionLabel icon={FileCode} label="ABOUT" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">自己紹介<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
        <p className="text-sm text-zinc-600 mb-10">Backend / Security / ML に興味のある近大生</p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        <FadeIn delay={0.1} className="md:col-span-2">
          <div className="space-y-4 text-sm sm:text-[0.935rem] text-zinc-400 leading-relaxed">
            <p>
              2024年に近畿大学 情報学部 情報学科へ入学した学部2年（2025年度〜3年）です。
              小学生の頃からe-kagakuでプログラミングやデータ分析に触れ、現在はバックエンドエンジニア、サイバーセキュリティ、機械学習に関心を持っています。
            </p>
            <p>
              チーム開発でカラオケ向け音域解析アプリ「Pitch Scout」を開発中で、バックエンドとMLモデルを担当しています。
              直近の「近大ハッカソン2025」ではKindai Innovation Awardを受賞し、KC3Hackなどの外部イベントでも開発経験を積んでいます。
            </p>
            <p>
              TOEIC 750など英語力も継続して強化しています。現在はe-kagakuでサポーターを務めつつ、
              実務経験やプロダクト運用の知見を得るため、バックエンド・セキュリティ・AI/ML分野の初インターンを探しています。
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="glass-card p-5 space-y-3.5">
            {[
              { icon: GraduationCap, label: "学歴",   value: "近畿大学 情報学部",         color: "#818cf8" },
              { icon: MapPin,        label: "所在地", value: "大阪",                      color: "#f472b6" },
              { icon: Search,        label: "興味",   value: "Security / ML / Backend",   color: "#22d3ee" },
              { icon: Briefcase,     label: "状況",   value: "初インターン探し中",          color: "#34d399" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}10`, border: `1px solid ${item.color}22` }}>
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
);

export default AboutSection;
