import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children?: ReactNode;
  range?: number;
  className?: string;
  style?: CSSProperties;
}

// Moves its children at a different rate than native scroll while the
// wrapper is passing through the viewport. `range` is the vertical travel
// in pixels (background/decorative layers only — never body copy).
export default function Parallax({ children, range = 60, className = "", style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range / -2, range / 2]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={shouldReduceMotion ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
