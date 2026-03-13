import { useState } from "react";
import { Mail, Copy, Check, Github, Send } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";

const GMAIL  = "https://mail.google.com/mail/?view=cm&to=kanaden0821@gmail.com";
const EMAIL  = "kanaden0821@gmail.com";
const GITHUB = "https://github.com/itukis";

// Formspreeのフォームを作成後、YOUR_FORM_ID を実際のIDに変更してください
// https://formspree.io/
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

const inputStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  color: "#e4e4e7",
  padding: "10px 14px",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | success | error

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitState("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitState("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
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

        {/* ── Contact Form ── */}
        <FadeIn delay={0.05}>
          <div className="glass-card p-6 sm:p-8 mb-6 text-left">
            {submitState === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}>
                  <Check size={22} style={{ color: "#34d399" }} />
                </div>
                <p className="text-sm font-medium text-zinc-300">送信しました！お返事をお待ちください。</p>
                <button onClick={() => setSubmitState("idle")}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mt-1">
                  もう一度送る
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">お名前</label>
                    <input
                      name="name" type="text" required value={form.name} onChange={handleChange}
                      placeholder="山田 太郎" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "rgba(129,140,248,0.4)"}
                      onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">メールアドレス</label>
                    <input
                      name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="example@email.com" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "rgba(129,140,248,0.4)"}
                      onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">メッセージ</label>
                  <textarea
                    name="message" required value={form.message} onChange={handleChange}
                    rows={4} placeholder="ご用件をお書きください..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                    onFocus={e => e.target.style.borderColor = "rgba(129,140,248,0.4)"}
                    onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>
                {submitState === "error" && (
                  <p className="text-xs text-red-400">送信に失敗しました。メールで直接ご連絡ください。</p>
                )}
                <button type="submit" disabled={submitState === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 4px 24px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                  <Send size={15} />
                  {submitState === "sending" ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
          </div>
        </FadeIn>

        {/* ── Email card + links ── */}
        <FadeIn delay={0.15}>
          <div className="glass-card p-5 mb-6 relative overflow-hidden group cursor-default" style={{ maxWidth: 420, margin: "0 auto 24px" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

          <div className="flex flex-wrap justify-center gap-3">
            <a href={GMAIL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 4px 24px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              <Mail size={16} /> メールを送る
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:brightness-125 active:scale-[0.97]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa" }}>
              <Github size={16} /> GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
