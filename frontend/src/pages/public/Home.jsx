import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listCategories } from "../../api/categories";
import CategoryCard from "../../components/public/CategoryCard";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";

function HeroStack({ labels }) {
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

export default function Home() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const sheetLabels = t("home.sheetLabels");
  const featureItems = t("home.features");
  const heroTitleLine2 = t("home.heroTitleLine2");
  const heroTitleLine2Accent = t("home.heroTitleLine2Accent");

  const load = () => {
    setError("");
    listCategories()
      .then((data) => setCategories(data.slice(0, 40)))
      .catch((err) => setError(getErrorMessage(err, t("common.couldNotLoadCategories"))));
  };

  useEffect(load, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
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
              {heroTitleLine2} <em>{heroTitleLine2Accent}</em>.
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
              <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }}>
                <Link to="/categories" className="btn btn-accent">
                  {t("common.browseCategories")}
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }}>
                <Link to="/contact" className="btn btn-outline">
                  {t("common.getQuote")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <HeroStack labels={sheetLabels} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("home.featured")}</span>
              <h2>{t("home.shopByCategory")}</h2>
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

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t("home.whyRidgeline")}</span>
              <h2>{t("home.builtLike")}</h2>
            </div>
          </div>
          <motion.div
            className="card-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {featureItems.map((f) => (
              <motion.div key={f.title} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 240, damping: 24 } } }} className="ply-card" style={{ cursor: "default" }}>
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
