import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listCategories } from "../../api/categories";
import CategoryCard from "../../components/public/CategoryCard";
import Parallax from "../../components/public/Parallax";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer, fadeUp } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import type { Category } from "../../types/models";

export default function Categories() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const load = () => {
    setError("");
    listCategories()
      .then(setCategories)
      .catch((err) => setError(getErrorMessage(err, t("common.couldNotLoadCategories"))));
  };

  useEffect(load, []);

  return (
    <div>
      <div className="page-header">
        <Parallax range={40} className="grain-overlay" />
        <motion.div
          className="container"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={fadeUp}>{t("categories.pageTitle")}</motion.h1>
          <motion.p variants={fadeUp}>{t("categories.pageDescription")}</motion.p>
        </motion.div>
      </div>

      <div className="container section">
        {categories === null && !error && <LoadingBlock label={t("common.loadingCategories")} />}
        {error && <ErrorBlock message={error} onRetry={load} />}
        {categories && categories.length === 0 && (
          <EmptyBlock title={t("common.noCategories")} message={t("common.noCategoriesMessage")} />
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
    </div>
  );
}
