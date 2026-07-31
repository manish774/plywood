import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listInquiries } from "../../api/contact";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { getErrorMessage } from "../../utils/errors";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    listInquiries()
      .then(setInquiries)
      .catch((err) => setError(getErrorMessage(err, "Could not load inquiries.")));
  };

  useEffect(load, []);

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Inquiries</h1>
          <p>Messages submitted through the public contact form.</p>
        </div>
      </div>

      {inquiries === null && !error && <LoadingBlock label="Loading inquiries..." />}
      {error && <ErrorBlock message={error} onRetry={load} />}
      {inquiries && inquiries.length === 0 && (
        <EmptyBlock title="No inquiries yet" message="Customer messages will show up here as they come in." />
      )}

      {inquiries && inquiries.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Contact</th>
                <th>Message</th>
                <th>Received</th>
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
