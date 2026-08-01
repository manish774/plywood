import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../i18n/useLanguage";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  images: "",
  thickness: "",
  size: "",
  grade: "",
  brand: "",
};

function toFormShape(item) {
  if (!item) return emptyForm;
  const categoryId =
    typeof item.category === "object" && item.category !== null
      ? item.category._id
      : item.category || "";
  return {
    name: item.name || "",
    description: item.description || "",
    price: item.price ?? "",
    category: categoryId,
    images: (item.images || []).join("\n"),
    thickness: item.specifications?.thickness || "",
    size: item.specifications?.size || "",
    grade: item.specifications?.grade || "",
    brand: item.specifications?.brand || "",
  };
}

export default function ItemForm({ open, initial, categories, busy, error, onSubmit, onCancel }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(() => toFormShape(initial));

  const initialKey = initial?._id || "new";
  const [lastKey, setLastKey] = useState(initialKey);
  if (initialKey !== lastKey) {
    setLastKey(initialKey);
    setForm(toFormShape(initial));
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      images: form.images
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      specifications: {
        thickness: form.thickness,
        size: form.size,
        grade: form.grade,
        brand: form.brand,
      },
    };
    onSubmit(payload);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="modal-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{initial ? t("common.editItem") : t("common.addItemModal")}</h2>
            {error && <div className="form-feedback form-feedback-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="item-name">{t("common.name")}</label>
                <input id="item-name" name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="field">
                <label htmlFor="item-description">{t("common.description")}</label>
                <textarea
                  id="item-description"
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="item-price">{t("common.priceUsd")}</label>
                  <input
                    id="item-price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="item-category">{t("common.category")}</label>
                  <select id="item-category" name="category" value={form.category} onChange={handleChange} required>
                    <option value="" disabled>
                      {t("common.selectCategory")}
                    </option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="item-images">{t("common.imageUrls")}</label>
                <textarea
                  id="item-images"
                  name="images"
                  rows={2}
                  value={form.images}
                  onChange={handleChange}
                  placeholder={t("common.itemImageUrlsPlaceholder")}
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="item-thickness">{t("common.thickness")}</label>
                  <input id="item-thickness" name="thickness" value={form.thickness} onChange={handleChange} placeholder="18mm" />
                </div>
                <div className="field">
                  <label htmlFor="item-size">{t("common.size")}</label>
                  <input id="item-size" name="size" value={form.size} onChange={handleChange} placeholder="2440 x 1220mm" />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="item-grade">{t("common.grade")}</label>
                  <input id="item-grade" name="grade" value={form.grade} onChange={handleChange} placeholder="BS 1088" />
                </div>
                <div className="field">
                  <label htmlFor="item-brand">{t("common.brand")}</label>
                  <input id="item-brand" name="brand" value={form.brand} onChange={handleChange} placeholder="Ridgeline" />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
                  {t("common.cancel")}
                </button>
                <button type="submit" className="btn btn-accent" disabled={busy}>
                  {busy ? t("common.saving") : t("common.saveItem")}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
