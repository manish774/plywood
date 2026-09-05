import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../i18n/useLanguage";
import type { Category, CategoryInput } from "../../types/models";

interface CategoryFormState {
  name: string;
  description: string;
  image: string;
}

const emptyForm: CategoryFormState = { name: "", description: "", image: "" };

interface CategoryFormProps {
  open: boolean;
  initial?: Category | null;
  busy?: boolean;
  error?: string | null;
  onSubmit: (payload: CategoryInput) => void;
  onCancel: () => void;
}

export default function CategoryForm({ open, initial, busy, error, onSubmit, onCancel }: CategoryFormProps) {
  const { t } = useLanguage();
  const [form, setForm] = useState<CategoryFormState>(initial || emptyForm);

  // Re-seed the form whenever a different category is opened for editing.
  const initialKey = initial?._id || "new";
  const [lastKey, setLastKey] = useState(initialKey);
  if (initialKey !== lastKey) {
    setLastKey(initialKey);
    setForm(initial || emptyForm);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
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
            <h2>{initial ? t("common.editCategory") : t("common.addCategoryModal")}</h2>
            {error && <div className="form-feedback form-feedback-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="cat-name">{t("common.name")}</label>
                <input
                  id="cat-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t("common.categoryPlaceholder")}
                />
              </div>
              <div className="field">
                <label htmlFor="cat-description">{t("common.description")}</label>
                <textarea
                  id="cat-description"
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short description shown on the public site"
                />
              </div>
              <div className="field">
                <label htmlFor="cat-image">{t("common.imageUrl")}</label>
                <input
                  id="cat-image"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
                  {t("common.cancel")}
                </button>
                <button type="submit" className="btn btn-accent" disabled={busy}>
                  {busy ? t("common.saving") : t("common.saveCategory")}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
