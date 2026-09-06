import { useEffect, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { listInquiries, acknowledgeInquiry } from "../../api/contact";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { WrenchLoader } from "../../components/Loaders";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";
import { useInquiries } from "../../context/InquiriesContext";
import { useSettings } from "../../context/SettingsContext";
import type { Contact } from "../../types/models";

export default function Inquiries() {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { refresh: refreshPendingCount } = useInquiries();
  const [inquiries, setInquiries] = useState<Contact[] | null>(null);
  const [error, setError] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [ackError, setAckError] = useState<Record<string, string>>({});

  const load = () => {
    setError("");
    listInquiries()
      .then(setInquiries)
      .catch((err) => setError(getErrorMessage(err, t("common.couldNotLoadInquiries"))));
  };

  useEffect(load, []);

  const handleAcknowledge = async (id: string) => {
    const message = (replyDrafts[id] || "").trim();
    if (!message) return;

    setBusyId(id);
    setAckError((prev) => ({ ...prev, [id]: "" }));
    try {
      const updated = await acknowledgeInquiry(id, message);
      setInquiries((prev) => (prev ? prev.map((inq) => (inq._id === id ? updated : inq)) : prev));
      setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
      refreshPendingCount();
    } catch (err) {
      setAckError((prev) => ({
        ...prev,
        [id]: getErrorMessage(err, t("admin.couldNotAcknowledge")),
      }));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>{t("admin.manageInquiriesTitle")}</h1>
          <p>{t("admin.manageInquiriesDescription")}</p>
        </div>
      </div>

      {inquiries === null && !error && <LoadingBlock label={t("common.loadingInquiries")} />}
      {error && <ErrorBlock message={error} onRetry={load} />}
      {inquiries && inquiries.length === 0 && (
        <EmptyBlock title={t("common.noInquiries")} message={t("common.noInquiriesMessage")} />
      )}

      {inquiries && inquiries.length > 0 && (
        <div className="admin-inquiry-list">
          {inquiries.map((inq) => (
            <motion.div
              key={inq._id}
              className="admin-inquiry-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="admin-inquiry-head">
                <div>
                  <div className="admin-table-name">{inq.name}</div>
                  <div className="admin-table-sub">
                    {inq.email}
                    {inq.phone ? ` · ${inq.phone}` : ""}
                    {inq.user ? ` · ${t("admin.hasAccount")}` : ""}
                  </div>
                  {inq.itemName && (
                    <div className="admin-table-sub">
                      {t("common.itemName")}: {inq.itemName}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={"query-status query-status-" + (inq.status || "pending")}>
                    {t(`myQueries.status.${inq.status || "pending"}`)}
                  </span>
                  <div className="admin-table-sub" style={{ fontFamily: "var(--font-mono)" }}>
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "—"}
                  </div>
                </div>
              </div>

              <p style={{ color: "var(--ink-soft)", margin: "12px 0" }}>{inq.message}</p>

              {inq.status === "acknowledged" ? (
                <div className="query-card-reply">
                  <span>{t("myQueries.replyLabel", { shopName: settings.shortName })}</span>
                  <p>{inq.adminReply}</p>
                </div>
              ) : (
                <div className="admin-inquiry-reply-form">
                  <textarea
                    rows={3}
                    placeholder={t("admin.replyPlaceholder")}
                    value={replyDrafts[inq._id] || ""}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setReplyDrafts((prev) => ({ ...prev, [inq._id]: e.target.value }))
                    }
                  />
                  {ackError[inq._id] && (
                    <div className="form-feedback form-feedback-error">{ackError[inq._id]}</div>
                  )}
                  <button
                    type="button"
                    className="btn btn-accent btn-sm"
                    disabled={busyId === inq._id || !(replyDrafts[inq._id] || "").trim()}
                    onClick={() => handleAcknowledge(inq._id)}
                  >
                    {busyId === inq._id && <WrenchLoader />}
                    {busyId === inq._id ? t("admin.acknowledging") : t("admin.acknowledge")}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
