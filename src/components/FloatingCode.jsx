const FloatingCode = () => (
  <div
    className="hidden lg:block absolute float-anim"
    style={{
      right: "6%", top: "50%", transform: "translateY(-50%)",
      background: "rgba(10,10,18,0.85)",
      border: "1px solid rgba(129,140,248,0.2)",
      borderRadius: "12px",
      width: "320px",
      backdropFilter: "blur(24px)",
      boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 30px rgba(129,140,248,0.1)",
      overflow: "hidden",
    }}
  >
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", gap: 6 }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", background: c, display: "inline-block" }} />
        ))}
      </div>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: "#71717a", fontWeight: "500", letterSpacing: "0.05em" }}>
        kanade@macbook: ~/pitch_scout
      </span>
      <div style={{ width: 42 }} />
    </div>

    <div style={{ padding: "16px 20px" }}>
      <pre style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", lineHeight: 1.75, margin: 0, whiteSpace: "pre" }}>
        <div style={{ color: "#34d399", marginBottom: 8, opacity: 0.8 }}>$ python extract_pitch.py</div>
        <span style={{ color: "#818cf8" }}>from</span><span style={{ color: "#e4e4e7" }}> demucs </span><span style={{ color: "#818cf8" }}>import</span><span style={{ color: "#e4e4e7" }}> separate{"\n"}</span>
        <span style={{ color: "#818cf8" }}>from</span><span style={{ color: "#e4e4e7" }}> crepe </span><span style={{ color: "#818cf8" }}>import</span><span style={{ color: "#e4e4e7" }}> predict{"\n"}</span>
        <span style={{ color: "#52525b" }}>{"\n"}# Vocal isolation pipeline{"\n"}</span>
        <span style={{ color: "#34d399" }}>stems</span><span style={{ color: "#e4e4e7" }}> = separate(audio){"\n"}</span>
        <span style={{ color: "#34d399" }}>vocal</span><span style={{ color: "#e4e4e7" }}> = stems[</span><span style={{ color: "#fbbf24" }}>"vocals"</span><span style={{ color: "#e4e4e7" }}>]{"\n"}</span>
        <span style={{ color: "#52525b" }}>{"\n"}# Core pitch detection{"\n"}</span>
        <span style={{ color: "#34d399" }}>freq</span><span style={{ color: "#e4e4e7" }}>, </span><span style={{ color: "#34d399" }}>conf</span><span style={{ color: "#e4e4e7" }}> = predict(vocal){"\n"}</span>
        <span style={{ color: "#e4e4e7", display: "inline-block", marginTop: 8 }}>
          &gt; Pitch extraction done <span className="cursor-blink" style={{ color: "#34d399", fontWeight: "bold" }}>_</span>
        </span>
      </pre>
    </div>
  </div>
);

export default FloatingCode;
