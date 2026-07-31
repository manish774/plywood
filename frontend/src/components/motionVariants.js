// Shared framer-motion variants — spring-based, used across public pages
// for scroll reveals and staggered lists.

export const springTransition = { type: "spring", stiffness: 260, damping: 24 };

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const revealItem = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { type: "spring", stiffness: 400, damping: 18 },
  },
};
