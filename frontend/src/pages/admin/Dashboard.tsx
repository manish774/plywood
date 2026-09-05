import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { listCategories } from "../../api/categories";
import { listItems } from "../../api/items";
import { listInquiries } from "../../api/contact";
import { useLanguage } from "../../i18n/useLanguage";

interface DashboardStats {
  categories: number | string | null;
  items: number | string | null;
  inquiries: number | string | null;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({ categories: null, items: null, inquiries: null });

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
          <h1>{t("admin.dashboardTitle")}</h1>
          <p>{t("admin.dashboardDescription")}</p>
        </div>
      </div>

      <div className="stat-grid">
        {[
          { label: t("admin.dashboardCards.categories"), value: stats.categories, to: "/admin/categories" },
          { label: t("admin.dashboardCards.items"), value: stats.items, to: "/admin/items" },
          { label: t("admin.dashboardCards.inquiries"), value: stats.inquiries, to: "/admin/inquiries" },
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
          {t("admin.gettingStartedTitle")}
        </h3>
        <p style={{ color: "var(--ink-soft)" }}>
          {t("admin.gettingStartedBody")}
        </p>
      </div>
    </div>
  );
}
