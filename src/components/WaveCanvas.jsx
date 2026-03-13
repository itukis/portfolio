import { useRef, useEffect } from "react";

const WaveCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf, t = 0;
    const resize = () => { c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2; ctx.scale(2, 2); };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const w = c.offsetWidth, h = c.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      [
        { a: 30, f: 0.006, s: 0.016, col: "rgba(129,140,248,0.12)", lw: 1.5 },
        { a: 20, f: 0.010, s: 0.012, col: "rgba(167,139,250,0.08)", lw: 1.2 },
        { a: 14, f: 0.016, s: 0.020, col: "rgba(196,181,253,0.06)", lw: 0.8 },
      ].forEach(v => {
        ctx.beginPath(); ctx.strokeStyle = v.col; ctx.lineWidth = v.lw;
        for (let x = 0; x < w; x += 2) {
          const y = h / 2 + Math.sin(x * v.f + t * v.s) * v.a + Math.sin(x * v.f * 1.7 + t * v.s * 0.5) * v.a * 0.3;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      t++; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />;
};

export default WaveCanvas;
