import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { LanguageContextValue } from "../../i18n/useLanguage";

// Placeholder banner photography — swap for real yard/product shots when
// available. Picked for variety (stacked sheets, hardwood grain, structural
// lumber, decorative veneer) so the carousel doesn't repeat itself.
const slideImages = [
  "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=1600&q=80", // carpenter marking a board on a miter saw
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1600&q=80", // wood-cabinetry kitchen
  "https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=1600&q=80", // framing a wood roof structure
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80", // wood-grain panel shelving
];

const slideLinks = ["/categories", "/categories", "/contact", "/categories"];

const AUTO_ADVANCE_MS = 5500;

export default function BannerCarousel({ t }: { t: LanguageContextValue["t"] }) {
  const slides = t("home.banners");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <section className="container banner-carousel-band">
      <div
        className="banner-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="banner-slide"
            style={{ backgroundImage: `url(${slideImages[index % slideImages.length]})` }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="banner-slide-overlay" />
            <div className="banner-slide-copy">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {slides[index].eyebrow}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                {slides[index].title}
              </motion.h2>
              <motion.p
                className="banner-slide-sub"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                {slides[index].subtitle}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
                <Link to={slideLinks[index % slideLinks.length]} className="btn btn-accent">
                  {slides[index].cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          className="banner-arrow banner-arrow-prev"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="banner-arrow banner-arrow-next"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="banner-dots" role="tablist" aria-label="Banner slides">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={"banner-dot" + (i === index ? " banner-dot-active" : "")}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
