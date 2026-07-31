import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listCategories } from "../../api/categories";
import CategoryCard from "../../components/public/CategoryCard";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";

const sheetLabels = [
  "18mm — BS 1088 Marine",
  "15mm — Baltic Birch",
  "12mm — CDX Structural",
  "6mm — Decorative Veneer",
];

function HeroStack() {
  return (
    <div className="hero-stack" aria-hidden="true">
      {sheetLabels.map((label, i) => (
        <motion.div
          key={label}
          className="hero-sheet"
          style={{
            top: i * 58,
            background: i % 2 === 0 ? "var(--bg-dark)" : "var(--bg-dark-panel)",
            zIndex: sheetLabels.length - i,
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

  const load = () => {
    setError("");
    listCategories()
      .then((data) => setCategories(data.slice(0, 4)))
      .catch((err) => setError(getErrorMessage(err, "Could not load categories.")));
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
              Yard-direct plywood &amp; sheet goods
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.1 }}
            >
              Cut true.
              <br />
              Built to <em>last</em>.
            </motion.h1>
            <motion.p
              className="hero-lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.2 }}
            >
              Marine, hardwood, structural and decorative plywood, stocked deep and priced
              straight. Browse the catalog or tell us what you're building and we'll
              find the right sheet for it.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
            >
              <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }}>
                <Link to="/categories" className="btn btn-accent">
                  Browse categories
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }}>
                <Link to="/contact" className="btn btn-outline">
                  Get a quote
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <HeroStack />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Featured</span>
              <h2>Shop by category</h2>
            </div>
            <Link to="/categories" className="btn btn-outline btn-sm">
              View all
            </Link>
          </div>

          {categories === null && !error && <LoadingBlock label="Loading categories..." />}
          {error && <ErrorBlock message={error} onRetry={load} />}
          {categories && categories.length === 0 && (
            <EmptyBlock
              title="No categories yet"
              message="Check back soon — the catalog is being stocked."
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
              <span className="eyebrow">Why Ridgeline</span>
              <h2>Built like the yard, not a showroom</h2>
            </div>
          </div>
          <motion.div
            className="card-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                title: "Real specs, every sheet",
                copy: "Thickness, size, grade and brand listed up front — no guessing what's arriving on the truck.",
              },
              {
                title: "Stocked deep",
                copy: "Marine to decorative veneer, kept in stock so your job doesn't wait on a backorder.",
              },
              {
                title: "Straight answers",
                copy: "Send a message with what you're building — we'll tell you the right sheet, not just the priciest one.",
              },
            ].map((f) => (
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
