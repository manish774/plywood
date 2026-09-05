// Shared framer-motion variants — spring-based, used across public pages
// for scroll reveals and staggered lists.
import type { Transition, Variants } from "framer-motion";

export const springTransition: Transition = { type: "spring", stiffness: 260, damping: 24 };

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

export const cardHover: Variants = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { type: "spring", stiffness: 400, damping: 18 },
  },
};

// Clip-path wipe reveal — used for section headings/eyebrows for a
// more premium "unmasking" feel than a plain fade.
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

// Spring used for magnetic buttons / tilt cards that track the cursor.
export const magneticSpring: Transition = { type: "spring", stiffness: 300, damping: 20, mass: 0.5 };
