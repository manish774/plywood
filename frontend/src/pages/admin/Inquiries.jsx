import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listInquiries } from "../../api/contact";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { getErrorMessage } from "../../utils/errors";
import { useLanguage } from "../../i18n/useLanguage";

export default function Inquiries() {
  const { t } = useLanguage();
  const [inquiries, setInquiries] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    listInquiries()
      .then(setInquiries)
      .catch((err) => setError(getErrorMessage(err, t("common.couldNotLoadInquiries"))));
  };

  useEffect(load, []);

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
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t("common.from")}</th>
                <th>{t("common.contact")}</th>
                <th>{t("common.message")}</th>
                <th>{t("common.received")}</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <motion.tr key={inq._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td className="admin-table-name">{inq.name}</td>
                  <td style={{ color: "var(--ink-soft)" }}>
                    <div>{inq.email}</div>
                    {inq.phone && <div className="admin-table-sub">{inq.phone}</div>}
                  </td>
                  <td style={{ maxWidth: 360, color: "var(--ink-soft)" }}>{inq.message}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "—"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
