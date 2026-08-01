import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getItem } from "../../api/items";
import { LoadingBlock, ErrorBlock } from "../../components/public/StateBlock";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const { t } = useLanguage();
  const specLabels = t("itemDetail.specLabels");

  const load = () => {
    setError("");
    setItem(null);
    setActiveImage(0);
    getItem(id)
      .then(setItem)
      .catch((err) => setError(getErrorMessage(err, t("common.couldNotLoadItem"))));
  };

  useEffect(load, [id]);

  if (!item && !error) {
    return (
      <div className="container section">
        <LoadingBlock label={t("common.loadingItem")} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container section">
        <ErrorBlock message={error} onRetry={load} />
      </div>
    );
  }

  const images = item.images?.length ? item.images : [];
  const category = item.category;

  return (
    <div className="container section">
      <div className="breadcrumb">
        <Link to="/categories">{t("itemDetail.breadcrumbCategories")}</Link>
        <span>/</span>
        {category?._id ? (
          <Link to={`/categories/${category._id}`}>{category.name}</Link>
        ) : (
          <span>{category?.name || t("itemDetail.pageTitle")}</span>
        )}
        <span>/</span>
        <span>{item.name}</span>
      </div>

      <div className="item-detail">
        <div>
          <div className="item-gallery-main">
            <AnimatePresence mode="wait">
              {images[activeImage] ? (
                <motion.img
                  key={images[activeImage]}
                  src={images[activeImage]}
                  alt={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              ) : null}
            </AnimatePresence>
          </div>
          {images.length > 1 && (
            <div className="item-gallery-thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  className={i === activeImage ? "active" : ""}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        >
          {category?.name && <span className="eyebrow">{category.name}</span>}
          <h1 style={{ marginTop: 10, fontSize: "2.2rem" }}>{item.name}</h1>

          {typeof item.price === "number" && (
            <div className="item-price-tag">
              ₹{item.price.toFixed(2)} <small>{t("common.perSheet")}</small>
            </div>
          )}

          <p className="item-description">{item.description}</p>

          {item.specifications && (
            <dl className="spec-table">
              {Object.entries(specLabels).map(([key, label]) =>
                item.specifications[key] ? (
                  <div className="spec-row" key={key}>
                    <dt>{label}</dt>
                    <dd>{item.specifications[key]}</dd>
                  </div>
                ) : null
              )}
            </dl>
          )}

          <div style={{ marginTop: 32 }}>
            <Link to="/contact" className="btn btn-accent">
              {t("common.askAboutSheet")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
