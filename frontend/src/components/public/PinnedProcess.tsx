import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ProcessStep {
  title: string;
  copy: string;
}

interface PinnedProcessProps {
  steps: ProcessStep[];
  image?: string;
}

// Pins a media panel in the viewport while the steps beside it cross-fade
// in sequence as the reader scrolls — the section's height is what drives
// the animation (scrollYProgress across the whole block), not individual
// element entrances. Falls back to a plain static list when the OS
// requests reduced motion, or there's no image to pin.
export default function PinnedProcess({ steps, image }: PinnedProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  if (shouldReduceMotion || !image) {
    return (
      <div className="pinned-process pinned-process-static">
        {image && (
          <div className="pinned-process-media">
            <img src={image} alt="" />
          </div>
        )}
        <div className="pinned-process-steps">
          {steps.map((step, i) => (
            <div key={i} className="pinned-process-step">
              <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pinned-process" style={{ height: `${steps.length * 70}vh` }}>
      <div className="pinned-process-sticky">
        <div className="pinned-process-media" aria-hidden="true">
          <img src={image} alt="" />
          <div className="pinned-process-media-overlay" />
        </div>
        <div className="pinned-process-steps">
          {steps.map((step, i) => (
            <ProcessLine key={i} index={i} step={step} progress={scrollYProgress} total={steps.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessLine({
  index,
  step,
  progress,
  total,
}: {
  index: number;
  step: ProcessStep;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, mid, end], [0.25, 1, 0.25]);
  const y = useTransform(progress, [start, mid, end], [18, 0, -18]);

  return (
    <motion.div className="pinned-process-step" style={{ opacity, y }}>
      <span className="process-index">{String(index + 1).padStart(2, "0")}</span>
      <h3>{step.title}</h3>
      <p>{step.copy}</p>
    </motion.div>
  );
}
