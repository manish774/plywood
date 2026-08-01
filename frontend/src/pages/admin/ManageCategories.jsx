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
import { useLanguage } from "../../i18n/useLanguage";

export default function ManageCategories() {
  const { t } = useLanguage();
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
      .catch((err) => setLoadError(getErrorMessage(err, t("common.couldNotLoadCategories"))));
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
      setFormError(getErrorMessage(err, t("common.couldNotSaveCategory")));
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
      setLoadError(getErrorMessage(err, t("common.couldNotDeleteCategory")));
      setConfirmTarget(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>{t("admin.manageCategoriesTitle")}</h1>
          <p>{t("admin.manageCategoriesDescription")}</p>
        </div>
        <button className="btn btn-accent" onClick={openCreate}>
          {t("common.addCategory")}
        </button>
      </div>

      {categories === null && !loadError && <LoadingBlock label={t("common.loadingCategories")} />}
      {loadError && <ErrorBlock message={loadError} onRetry={load} />}
      {categories && categories.length === 0 && (
        <EmptyBlock
          title={t("common.noCategories")}
          message={t("common.categoryEmpty")}
        />
      )}

      {categories && categories.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>{t("common.name")}</th>
                <th>{t("common.description")}</th>
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
                        {t("common.edit")}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setConfirmTarget(c)}
                      >
                        {t("common.delete")}
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
        title={t("common.confirmDeleteCategory")}
        message={
          confirmTarget
            ? t("common.confirmCategoryDeleteText", { name: confirmTarget.name })
            : ""
        }
        busy={deleteBusy}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
