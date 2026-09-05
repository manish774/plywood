import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";
import { staggerContainer, clipReveal } from "../motionVariants";
import type { LanguageContextValue } from "../../i18n/useLanguage";
import type { Category, Item } from "../../types/models";

interface FeaturedRowProps {
  category: Category;
  items: Item[];
  t: LanguageContextValue["t"];
}

export default function FeaturedRow({ category, items, t }: FeaturedRowProps) {
  if (items.length === 0) return null;

  return (
    <div className="featured-row">
      <div className="section-head">
        <div>
          <span className="eyebrow">{t("home.featured")}</span>
          <motion.h2 variants={clipReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
            {t("home.featuredIn", { category: category.name })}
          </motion.h2>
        </div>
        <Link to={`/categories/${category._id}`} className="btn btn-outline btn-sm">
          {t("common.viewAll")}
        </Link>
      </div>
      <motion.div
        className="card-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
