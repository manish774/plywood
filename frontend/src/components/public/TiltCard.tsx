import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";

const TILT_RANGE = 8; // degrees — kept subtle so it reads as premium, not gimmicky

interface TiltCardProps extends Omit<HTMLMotionProps<"article">, "ref"> {
  children?: ReactNode;
  className?: string;
}

// Wraps a card in a cursor-tracked 3D tilt. Scroll-reveal (variants/whileInView)
// and hover/tap animation are passed straight through to the underlying
// motion.article, so this composes with the existing reveal system instead
// of replacing it.
export default function TiltCard({ children, className = "", style, ...rest }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [TILT_RANGE, -TILT_RANGE]), {
    stiffness: 300,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-TILT_RANGE, TILT_RANGE]), {
    stiffness: 300,
    damping: 26,
  });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      className={`tilt-card ${className}`}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 900,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </motion.article>
  );
}
