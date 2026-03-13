const Tag = ({ children, glow = false }) => (
  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md" style={{
    background: glow ? "rgba(129,140,248,0.08)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${glow ? "rgba(129,140,248,0.22)" : "rgba(255,255,255,0.06)"}`,
    color: glow ? "#a5b4fc" : "#a1a1aa",
  }}>
    {children}
  </span>
);

export default Tag;
