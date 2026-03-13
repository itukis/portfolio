import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const LoadingScreen = ({ onDone }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1000);
    const t2 = setTimeout(onDone, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#080810",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.5s ease",
      pointerEvents: fading ? "none" : "auto",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 20,
        background: "rgba(129,140,248,0.1)",
        border: "1px solid rgba(129,140,248,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
        boxShadow: "0 0 40px rgba(129,140,248,0.2)",
      }}>
        <Terminal size={28} style={{ color: "#818cf8" }} />
      </div>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: "#818cf8", letterSpacing: "0.12em" }}>
        K.Nishida
      </p>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#27272a", marginTop: 8 }}>
        initializing...
      </p>
    </div>
  );
};

export default LoadingScreen;
