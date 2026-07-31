import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listItems, createItem, updateItem, deleteItem } from "../../api/items";
import { listCategories } from "../../api/categories";
import ItemForm from "../../components/admin/ItemForm";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { getErrorMessage } from "../../utils/errors";

export default function ManageItems() {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadError, setLoadError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = () => {
    setLoadError("");
    Promise.all([listItems(), listCategories()])
      .then(([itemData, catData]) => {
        setItems(itemData);
        setCategories(catData);
      })
      .catch((err) => setLoadError(getErrorMessage(err, "Could not load items.")));
  };

  useEffect(load, []);

  const openCreate = () => {
    if (categories.length === 0) {
      setLoadError("Add a category before creating an item.");
      return;
    }
    setEditing(null);
    setFormError("");
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setFormError("");
    setFormOpen(true);
  };

  const handleSubmit = async (payload) => {
    setBusy(true);
    setFormError("");
    try {
      if (editing) {
        await updateItem(editing._id, payload);
      } else {
        await createItem(payload);
      }
      setFormOpen(false);
      load();
    } catch (err) {
      setFormError(getErrorMessage(err, "Could not save item."));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setDeleteBusy(true);
    try {
      await deleteItem(confirmTarget._id);
      setConfirmTarget(null);
      load();
    } catch (err) {
      setLoadError(getErrorMessage(err, "Could not delete item."));
      setConfirmTarget(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Items</h1>
          <p>Individual products, each belonging to a category.</p>
        </div>
        <button className="btn btn-accent" onClick={openCreate}>
          + Add item
        </button>
      </div>

      {items === null && !loadError && <LoadingBlock label="Loading items..." />}
      {loadError && <ErrorBlock message={loadError} onRetry={load} />}
      {items && items.length === 0 && (
        <EmptyBlock title="No items yet" message="Add your first item to show it on the public site." />
      )}

      {items && items.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <motion.tr key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td>
                    {item.images?.[0] ? (
                      <img className="admin-table-thumb" src={item.images[0]} alt="" />
                    ) : (
                      <div className="admin-table-thumb" />
                    )}
                  </td>
                  <td>
                    <div className="admin-table-name">{item.name}</div>
                    <div className="admin-table-sub">{item.specifications?.thickness}</div>
                  </td>
                  <td style={{ color: "var(--ink-soft)" }}>
                    {item.category?.name || "—"}
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)" }}>
                    {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : "—"}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setConfirmTarget(item)}>
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

      <ItemForm
        open={formOpen}
        initial={editing}
        categories={categories}
        busy={busy}
        error={formError}
        onSubmit={handleSubmit}
        onCancel={() => setFormOpen(false)}
      />

      <ConfirmModal
        open={Boolean(confirmTarget)}
        title="Delete this item?"
        message={confirmTarget ? `"${confirmTarget.name}" will be removed from the public site.` : ""}
        busy={deleteBusy}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
