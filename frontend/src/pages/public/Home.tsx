import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { listCategories } from "../../api/categories";
import { listItems } from "../../api/items";
import Seo, { SITE_URL } from "../../components/Seo";
import CategoryCard from "../../components/public/CategoryCard";
import Counter from "../../components/public/Counter";
import Marquee from "../../components/public/Marquee";
import ValueProps from "../../components/public/ValueProps";
import BannerCarousel from "../../components/public/BannerCarousel";
import FeaturedRow from "../../components/public/FeaturedRow";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer, clipReveal, fadeUp } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage, type LanguageContextValue } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";
import type { Category, Item } from "../../types/models";

function HeroStack({ labels }: { labels: string[] }) {
  return (
    <div className="hero-stack" aria-hidden="true">
      {labels.map((label, i) => (
        <motion.div
          key={label}
          className="hero-sheet"
          style={{
            top: i * 58,
            background: i % 2 === 0 ? "var(--bg-dark)" : "var(--bg-dark-panel)",
            zIndex: labels.length - i,
          }}
          initial={{ opacity: 0, x: 60, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          whileHover={{ x: 10, transition: { type: "spring", stiffness: 300, damping: 16 } }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 20,
            delay: 0.15 + i * 0.12,
          }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

interface HeroProps {
  sheetLabels: string[];
  t: LanguageContextValue["t"];
}

function Hero({ sheetLabels, t }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect || !spotlightRef.current) return;
    spotlightRef.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    spotlightRef.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero-spotlight" ref={spotlightRef} />
      <div className="grain-overlay" />
      <motion.div className="container hero-inner" style={{ y, opacity }}>
        <div>
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            {t("home.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.1 }}
          >
            {t("home.heroTitleLine1")}
            <br />
            {t("home.heroTitleLine2")} <em className="text-gradient">{t("home.heroTitleLine2Accent")}</em>.
          </motion.h1>
          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.2 }}
          >
            {t("home.heroLede")}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
          >
            <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -3 }}>
              <Link to="/categories" className="btn btn-accent">
                {t("common.browseCategories")}
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -3 }}>
              <Link to="/contact" className="btn btn-outline">
                {t("common.getQuote")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <HeroStack labels={sheetLabels} />
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const { settings } = useSettings();
  const sheetLabels = t("home.sheetLabels");
  const featureItems = t("home.features");
  const processSteps = t("home.process");
  const stats = t("home.stats");

  const load = () => {
    setError("");
    Promise.all([listCategories(), listItems()])
      .then(([cats, allItems]) => {
        setCategories(cats.slice(0, 40));
        setItems(allItems);
      })
      .catch((err) => setError(getErrorMessage(err, t("common.couldNotLoadCategories"))));
  };

  useEffect(load, []);

  // Up to 3 categories that actually have stock, each with up to 4 items,
  // used for the "Featured in <category>" rows below the category grid.
  const featuredRows = (categories || [])
    .map((cat) => ({
      category: cat,
      items: items.filter((item) => {
        const itemCategoryId = typeof item.category === "object" ? item.category?._id : item.category;
        return itemCategoryId === cat._id;
      }).slice(0, 4),
    }))
    .filter((row) => row.items.length > 0)
    .slice(0, 3);

  const brands = Array.from(
    new Set(items.map((item) => item.specifications?.brand).filter((b): b is string => Boolean(b)))
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    name: settings.shopName,
    image: settings.logoUrl || undefined,
    url: SITE_URL,
    telephone: settings.phone,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Ormanjhi",
      addressRegion: "Jharkhand",
      addressCountry: "IN",
    },
    sameAs: [settings.instagramUrl, settings.facebookUrl].filter(Boolean),
  };

  return (
    <div>
      <Seo
        title={t("seo.homeTitle", { shopName: settings.shopName })}
        description={t("seo.homeDescription", { shopName: settings.shopName })}
        keywords={t("seo.defaultKeywords")}
        path="/"
        structuredData={localBusinessSchema}
      />

      <BannerCarousel t={t} />

      <Hero sheetLabels={sheetLabels} t={t} />

      <ValueProps t={t} />

      <Marquee items={sheetLabels} />

      <section className="stats-band container">
        <div className="stat">
          <span className="stat-number">
            <Counter value={categories ? categories.length : 0} />
          </span>
          <span className="stat-label">{stats.categories}</span>
        </div>
        <div className="stat">
          <span className="stat-number">
            <Counter value={items.length} />
          </span>
          <span className="stat-label">{stats.items}</span>
        </div>
        <div className="stat">
          <span className="stat-number">
            <Counter value={1} />
          </span>
          <span className="stat-label">{stats.turnaround}</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("home.featured")}</span>
              <motion.h2 variants={clipReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
                {t("home.shopByCategory")}
              </motion.h2>
            </div>
            <Link to="/categories" className="btn btn-outline btn-sm">
              {t("common.viewAll")}
            </Link>
          </div>

          {categories === null && !error && <LoadingBlock label={t("common.loadingCategories")} />}
          {error && <ErrorBlock message={error} onRetry={load} />}
          {categories && categories.length === 0 && (
            <EmptyBlock
              title={t("common.noCategories")}
              message={t("common.noCategoriesMessage")}
            />
          )}

          {categories && categories.length > 0 && (
            <motion.div
              className="card-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {categories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {featuredRows.length > 0 && (
        <section className="section section-alt">
          <div className="container featured-rows">
            {featuredRows.map(({ category, items: rowItems }) => (
              <FeaturedRow key={category._id} category={category} items={rowItems} t={t} />
            ))}
          </div>
        </section>
      )}

      {brands.length > 0 && (
        <section className="section brand-strip-band">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">{t("home.brandsEyebrow")}</span>
                <motion.h2 variants={clipReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
                  {t("home.brandsHeading")}
                </motion.h2>
              </div>
            </div>
          </div>
          <Marquee items={brands} label={t("home.brandsEyebrow")} />
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("home.howItWorks")}</span>
              <motion.h2 variants={clipReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
                {t("home.howItWorksTitle")}
              </motion.h2>
            </div>
          </div>
          <motion.div
            className="process-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {processSteps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="process-step">
                <span className="process-index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("home.whyRidgeline", { shopName: settings.shortName })}</span>
              <motion.h2 variants={clipReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
                {t("home.builtLike")}
              </motion.h2>
            </div>
          </div>
          <motion.div
            className="card-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {featureItems.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="ply-card" style={{ cursor: "default" }}>
                <div className="ply-card-edge ply-stripe" aria-hidden="true" />
                <div className="ply-card-body">
                  <h3>{f.title}</h3>
                  <p>{f.copy}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
