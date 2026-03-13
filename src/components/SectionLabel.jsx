const SectionLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "rgba(129,140,248,0.1)" }}>
      <Icon size={13} style={{ color: "#818cf8" }} />
    </div>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 500, color: "#818cf8", letterSpacing: "0.14em" }}>
      {label}
    </span>
  </div>
);

export default SectionLabel;
