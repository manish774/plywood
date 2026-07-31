import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categories";
import CategoryForm from "../../components/admin/CategoryForm";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { getErrorMessage } from "../../utils/errors";

export default function ManageCategories() {
  const [categories, setCategories] = useState(null);
  const [loadError, setLoadError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = () => {
    setLoadError("");
    listCategories()
      .then(setCategories)
      .catch((err) => setLoadError(getErrorMessage(err, "Could not load categories.")));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setFormError("");
    setFormOpen(true);
  };

  const openEdit = (category) => {
    setEditing(category);
    setFormError("");
    setFormOpen(true);
  };

  const handleSubmit = async (payload) => {
    setBusy(true);
    setFormError("");
    try {
      if (editing) {
        await updateCategory(editing._id, payload);
      } else {
        await createCategory(payload);
      }
      setFormOpen(false);
      load();
    } catch (err) {
      setFormError(getErrorMessage(err, "Could not save category."));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setDeleteBusy(true);
    try {
      await deleteCategory(confirmTarget._id);
      setConfirmTarget(null);
      load();
    } catch (err) {
      setLoadError(getErrorMessage(err, "Could not delete category."));
      setConfirmTarget(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Categories</h1>
          <p>Groups of plywood shown on the public site.</p>
        </div>
        <button className="btn btn-accent" onClick={openCreate}>
          + Add category
        </button>
      </div>

      {categories === null && !loadError && <LoadingBlock label="Loading categories..." />}
      {loadError && <ErrorBlock message={loadError} onRetry={load} />}
      {categories && categories.length === 0 && (
        <EmptyBlock
          title="No categories yet"
          message="Add your first category to start building out the public catalog."
        />
      )}

      {categories && categories.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <motion.tr
                  key={c._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>
                    {c.image ? (
                      <img className="admin-table-thumb" src={c.image} alt="" />
                    ) : (
                      <div className="admin-table-thumb" />
                    )}
                  </td>
                  <td className="admin-table-name">{c.name}</td>
                  <td style={{ color: "var(--ink-soft)", maxWidth: 360 }}>{c.description}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(c)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setConfirmTarget(c)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CategoryForm
        open={formOpen}
        initial={editing}
        busy={busy}
        error={formError}
        onSubmit={handleSubmit}
        onCancel={() => setFormOpen(false)}
      />

      <ConfirmModal
        open={Boolean(confirmTarget)}
        title="Delete this category?"
        message={
          confirmTarget
            ? `"${confirmTarget.name}" and its items will no longer appear on the public site.`
            : ""
        }
        busy={deleteBusy}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
