import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory } from "../../api/categories";
import { listItems } from "../../api/items";
import Seo, { SITE_URL } from "../../components/Seo";
import ItemCard from "../../components/public/ItemCard";
import Parallax from "../../components/public/Parallax";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";
import type { Category, Item } from "../../types/models";

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const { settings } = useSettings();

  const load = () => {
    if (!id) return;
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

  const breadcrumbSchema = category
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("categoryDetail.breadcrumb"), item: `${SITE_URL}/categories` },
          { "@type": "ListItem", position: 2, name: category.name, item: `${SITE_URL}/categories/${category._id}` },
        ],
      }
    : undefined;

  return (
    <div>
      <Seo
        title={
          category
            ? t("seo.categoryTitle", { name: category.name, shopName: settings.shopName })
            : t("seo.categoriesTitle", { shopName: settings.shopName })
        }
        description={
          category?.description ||
          (category
            ? t("seo.categoryDescription", { name: category.name, shopName: settings.shopName })
            : t("seo.categoriesDescription", { shopName: settings.shopName }))
        }
        path={`/categories/${id || ""}`}
        image={category?.image}
        structuredData={breadcrumbSchema}
      />

      <div className="page-header">
        <Parallax range={40} className="grain-overlay" />
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        >
          <div className="breadcrumb">
            <Link to="/categories">{t("categoryDetail.breadcrumb")}</Link>
            <span>/</span>
            <span>{category?.name || "…"}</span>
          </div>
          <h1>{category?.name || (error ? t("categoryDetail.pageTitle") : "…")}</h1>
          {category?.description && <p>{category.description}</p>}
        </motion.div>
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
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
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
