import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LightboxProps {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// Fullscreen image viewer for the item gallery — opened by clicking the
// main gallery image. Shares the AnimatePresence crossfade pattern used by
// ItemDetail's inline gallery so the transition feels consistent whether
// you're paging thumbnails or the lightbox.
export default function Lightbox({ images, index, alt, onClose, onNavigate }: LightboxProps) {
  const hasMultiple = images.length > 1;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) onNavigate((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight" && hasMultiple) onNavigate((index + 1) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, images.length, hasMultiple, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={alt}
              className="lightbox-image"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </AnimatePresence>

          {hasMultiple && (
            <>
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-prev"
                aria-label="Previous image"
                onClick={() => onNavigate((index - 1 + images.length) % images.length)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-next"
                aria-label="Next image"
                onClick={() => onNavigate((index + 1) % images.length)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="lightbox-counter">
                {index + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
