import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

// Animated count-up used in the stats band. Counts from 0 to `value` once
// the element scrolls into view; jumps straight to the final value when
// the user has reduced motion enabled.
export default function Counter({ value, suffix = "", prefix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 22 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={className}>
        {`${prefix}${value}${suffix}`}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
