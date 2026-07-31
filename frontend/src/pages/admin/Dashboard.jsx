import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listCategories } from "../../api/categories";
import { listItems } from "../../api/items";
import { listInquiries } from "../../api/contact";

export default function Dashboard() {
  const [stats, setStats] = useState({ categories: null, items: null, inquiries: null });

  useEffect(() => {
    let cancelled = false;

    listCategories()
      .then((data) => !cancelled && setStats((s) => ({ ...s, categories: data.length })))
      .catch(() => !cancelled && setStats((s) => ({ ...s, categories: "—" })));

    listItems()
      .then((data) => !cancelled && setStats((s) => ({ ...s, items: data.length })))
      .catch(() => !cancelled && setStats((s) => ({ ...s, items: "—" })));

    listInquiries()
      .then((data) => !cancelled && setStats((s) => ({ ...s, inquiries: data.length })))
      .catch(() => !cancelled && setStats((s) => ({ ...s, inquiries: "—" })));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Manage what shows up on the public site.</p>
        </div>
      </div>

      <div className="stat-grid">
        {[
          { label: "Categories", value: stats.categories, to: "/admin/categories" },
          { label: "Items", value: stats.items, to: "/admin/items" },
          { label: "Inquiries", value: stats.inquiries, to: "/admin/inquiries" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: i * 0.06 }}
          >
            <Link to={s.to} className="stat-card" style={{ display: "block" }}>
              <div className="stat-value">{s.value ?? "…"}</div>
              <div className="stat-label">{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="admin-table-wrap" style={{ padding: 28 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", marginBottom: 10 }}>
          Getting started
        </h3>
        <p style={{ color: "var(--ink-soft)" }}>
          Add a category first, then add items under it &mdash; items you create here appear
          immediately on the public site's category pages.
        </p>
      </div>
    </div>
  );
}
