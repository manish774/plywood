import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ScrollTiltRevealProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

// Scroll-scrubbed reveal (continuously tied to scroll position rather than
// a one-shot whileInView spring) — each card rotates in from a slight tilt
// on alternating sides as it passes through the lower viewport, like a
// photo sliding into a collage rather than just fading up.
export default function ScrollTiltReveal({ children, index = 0, className = "" }: ScrollTiltRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.4"] });
  const direction = index % 2 === 0 ? -1 : 1;
  const rotate = useTransform(scrollYProgress, [0, 1], [direction * 10, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={className} style={{ height: "100%" }}>
      <motion.div style={shouldReduceMotion ? undefined : { rotate, y, opacity, height: "100%" }}>
        {children}
      </motion.div>
    </div>
  );
}
