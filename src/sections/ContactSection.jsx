import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const GMAIL  = "https://mail.google.com/mail/?view=cm&to=kanaden0821@gmail.com";
const EMAIL  = "kanaden0821@gmail.com";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <SectionLabel icon={Mail} label="CONTACT" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 glitch-hover transition-colors inline-block">お問い合わせ<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
          <p className="text-sm text-zinc-500 mb-10 max-w-md mx-auto">
            インターンのご相談やお仕事のご依頼など、お気軽にご連絡ください。
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="glass-card p-8 mb-6 relative overflow-hidden group cursor-default" style={{ maxWidth: 420, margin: "0 auto 24px" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]"
              style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1))", border: "1px solid rgba(129,140,248,0.2)" }}>
              <Mail size={24} style={{ color: "#a5b4fc" }} />
            </div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1 mono">Email</p>
            <div className="flex items-center justify-center gap-2">
              <a href={GMAIL} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-300 hover:text-white transition-colors">
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                className="flex items-center justify-center rounded-lg transition-all"
                style={{
                  width: 28, height: 28,
                  background: copied ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}`,
                  color: copied ? "#34d399" : "#71717a",
                  flexShrink: 0,
                }}
                aria-label="メールアドレスをコピー"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <a href={GMAIL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 4px 24px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              <Mail size={16} /> メールを送る
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
