import { motion, useScroll, useSpring } from "framer-motion";

// Fixed hairline at the top of the viewport that fills as the reader
// scrolls the page — a small orientation cue used across premium sites.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
