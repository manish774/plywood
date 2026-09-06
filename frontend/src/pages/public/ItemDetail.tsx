import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getItem } from "../../api/items";
import { LoadingBlock, ErrorBlock } from "../../components/public/StateBlock";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";
import { staggerContainer, fadeUp } from "../../components/motionVariants";
import { buildItemWhatsAppUrl } from "../../utils/whatsapp";
import WhatsAppIcon from "../../components/icons/WhatsAppIcon";
import type { Item, ItemSpecifications } from "../../types/models";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const { t } = useLanguage();
  const { settings } = useSettings();
  const specLabels = t("itemDetail.specLabels");

  const load = () => {
    if (!id) return;
    setError("");
    setItem(null);
    setActiveImage(0);
    getItem(id)
      .then(setItem)
      .catch((err) =>
        setError(getErrorMessage(err, t("common.couldNotLoadItem"))),
      );
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

  if (!item) return null;

  const images = item.images?.length ? item.images : [];
  const category =
    item.category && typeof item.category === "object" ? item.category : null;

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
        <div className="item-gallery">
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
          style={{ padding: 10 }}
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
            <motion.dl
              className="spec-table"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {Object.entries(specLabels).map(([key, label]) => {
                const specKey = key as keyof ItemSpecifications;
                return item.specifications[specKey] ? (
                  <motion.div className="spec-row" key={key} variants={fadeUp}>
                    <dt>{label}</dt>
                    <dd>{item.specifications[specKey]}</dd>
                  </motion.div>
                ) : null;
              })}
            </motion.dl>
          )}

          <div className="item-actions" style={{ marginTop: 32 }}>
            <Link
              to="/contact"
              state={{ itemName: item.name, itemId: item._id }}
              className="btn btn-accent"
            >
              {t("common.askAboutSheet")}
            </Link>
            <a
              href={buildItemWhatsAppUrl(item, settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon />
              {t("common.askOnWhatsapp")}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
