import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../motionVariants";
import type { LanguageContextValue } from "../../i18n/useLanguage";

const icons = [
  // Dispatch / truck
  <path key="truck" d="M2 7h11v9H2zM13 10h4l4 3v3h-8zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  // Genuine / badge-check
  <path key="badge" d="m9 12 2 2 4-4M12 3l2.2 1.3 2.6-.2 1 2.4 2.4 1-.2 2.6L21.3 12 20 14.2l.2 2.6-2.4 1-1 2.4-2.6-.2L12 21.5l-2.2-1.3-2.6.2-1-2.4-2.4-1 .2-2.6L2.7 12 4 9.8l-.2-2.6 2.4-1 1-2.4 2.6.2z" />,
  // Warranty / shield
  <path key="shield" d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5z" />,
  // Pricing / tag
  <path key="tag" d="M2 12 12 2h8v8L10 20a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8zM16 6h.01" />,
];

export default function ValueProps({ t }: { t: LanguageContextValue["t"] }) {
  const props = t("home.valueProps");

  return (
    <section className="value-props-band container">
      <motion.div
        className="value-props"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {props.map((prop, i) => (
          <motion.div className="value-prop" key={i} variants={fadeUp}>
            <span className="value-prop-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {icons[i % icons.length]}
              </svg>
            </span>
            <h3>{prop.title}</h3>
            <p>{prop.copy}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
