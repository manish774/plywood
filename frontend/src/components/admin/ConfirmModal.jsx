import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  busy = false,
  onConfirm,
  onCancel,
}) {
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
            className="modal-panel confirm-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={onCancel} disabled={busy}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={onConfirm} disabled={busy}>
                {busy ? "Deleting..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
