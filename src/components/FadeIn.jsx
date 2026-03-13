import { useRef, useState, useEffect } from "react";

export const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.65s cubic-bezier(.4,0,.2,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
};

export default FadeIn;
