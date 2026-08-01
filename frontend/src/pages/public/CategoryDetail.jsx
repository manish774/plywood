import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory } from "../../api/categories";
import { listItems } from "../../api/items";
import ItemCard from "../../components/public/ItemCard";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";

export default function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const load = () => {
    setError("");
    setCategory(null);
    setItems(null);
    Promise.all([getCategory(id), listItems(id)])
      .then(([cat, itemData]) => {
        setCategory(cat);
        setItems(itemData);
      })
      .catch((err) => setError(getErrorMessage(err, t("common.couldNotLoadCategory"))));
  };

  useEffect(load, [id]);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/categories">{t("categoryDetail.breadcrumb")}</Link>
            <span>/</span>
            <span>{category?.name || "…"}</span>
          </div>
          <h1>{category?.name || (error ? t("categoryDetail.pageTitle") : "…")}</h1>
          {category?.description && <p>{category.description}</p>}
        </div>
      </div>

      <div className="container section">
        {!category && !error && <LoadingBlock label={t("common.loadingCategory")} />}
        {error && <ErrorBlock message={error} onRetry={load} />}

        {items && items.length === 0 && (
          <EmptyBlock title={t("common.noCategoryItems")} message={t("common.noCategoryItemsMessage")} />
        )}

        {items && items.length > 0 && (
          <motion.div
            className="card-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
