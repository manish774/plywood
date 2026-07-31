import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emptyForm = { name: "", description: "", image: "" };

export default function CategoryForm({ open, initial, busy, error, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm);

  // Re-seed the form whenever a different category is opened for editing.
  const initialKey = initial?._id || "new";
  const [lastKey, setLastKey] = useState(initialKey);
  if (initialKey !== lastKey) {
    setLastKey(initialKey);
    setForm(initial || emptyForm);
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
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
            <h2>{initial ? "Edit category" : "Add category"}</h2>
            {error && <div className="form-feedback form-feedback-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="cat-name">Name</label>
                <input
                  id="cat-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Marine Plywood"
                />
              </div>
              <div className="field">
                <label htmlFor="cat-description">Description</label>
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
                <label htmlFor="cat-image">Image URL</label>
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
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent" disabled={busy}>
                  {busy ? "Saving..." : "Save category"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
