import { useState, useEffect } from "react";

const PHRASES = [
  "initializing_portfolio",
  "import fastapi, demucs",
  "train_model --epochs 100",
  "git push origin main",
];

const TypewriterText = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const target = PHRASES[idx];
    let t;
    if (!del && text.length < target.length)
      t = setTimeout(() => setText(target.slice(0, text.length + 1)), 72);
    else if (!del)
      t = setTimeout(() => setDel(true), 2200);
    else if (del && text.length > 0)
      t = setTimeout(() => setText(text.slice(0, -1)), 34);
    else { setDel(false); setIdx((idx + 1) % PHRASES.length); }
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return (
    <p className="mono text-xs sm:text-sm mb-6" style={{ color: "#818cf8", letterSpacing: "0.08em" }}>
      <span style={{ color: "#34d399" }}>❯</span>{" "}
      {text}<span className="cursor-blink" style={{ borderRight: "2px solid #818cf8", marginLeft: 1 }}>&nbsp;</span>
    </p>
  );
};

export default TypewriterText;
