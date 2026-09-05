import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listMyInquiries } from "../../api/contact";
import { useUserAuth } from "../../context/UserAuthContext";
import Parallax from "../../components/public/Parallax";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import type { Contact } from "../../types/models";

export default function MyQueries() {
  const { user, logout } = useUserAuth();
  const { t } = useLanguage();
  const [queries, setQueries] = useState<Contact[] | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    listMyInquiries()
      .then(setQueries)
      .catch((err) => setError(getErrorMessage(err, t("myQueries.couldNotLoad"))));
  };

  useEffect(load, []);

  return (
    <div>
      <div className="page-header">
        <Parallax range={40} className="grain-overlay" />
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        >
          <h1>{t("myQueries.pageTitle")}</h1>
          <p>{user ? t("myQueries.pageDescription", { name: user.name }) : t("myQueries.pageDescriptionGeneric")}</p>
          <button type="button" className="btn btn-outline btn-sm" onClick={logout} style={{ marginTop: 20 }}>
            {t("common.logOut")}
          </button>
        </motion.div>
      </div>

      <div className="container section">
        {queries === null && !error && <LoadingBlock label={t("myQueries.loading")} />}
        {error && <ErrorBlock message={error} onRetry={load} />}
        {queries && queries.length === 0 && (
          <EmptyBlock title={t("myQueries.empty")} message={t("myQueries.emptyMessage")} />
        )}

        {queries && queries.length > 0 && (
          <div className="query-list">
            {queries.map((q) => (
              <motion.div
                key={q._id}
                className="query-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="query-card-head">
                  <span className={"query-status query-status-" + q.status}>
                    {t(`myQueries.status.${q.status}`)}
                  </span>
                  <span className="query-card-date">
                    {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : "—"}
                  </span>
                </div>
                {q.itemName && <span className="eyebrow">{t("common.itemName")}: {q.itemName}</span>}
                <p className="query-card-message">{q.message}</p>
                {q.status === "acknowledged" && q.adminReply && (
                  <div className="query-card-reply">
                    <span>{t("myQueries.replyLabel")}</span>
                    <p>{q.adminReply}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
