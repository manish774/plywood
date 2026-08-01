import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listCategories } from "../../api/categories";
import CategoryCard from "../../components/public/CategoryCard";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";

export default function Categories() {
  const [categories, setCategories] = useState(null);
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
        <div className="container">
          <h1>{t("categories.pageTitle")}</h1>
          <p>{t("categories.pageDescription")}</p>
        </div>
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
            animate="show"
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
