import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../i18n/useLanguage";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const links = [
    { to: "/admin", label: t("admin.dashboardTitle"), end: true },
    { to: "/admin/categories", label: t("admin.manageCategoriesTitle") },
    { to: "/admin/items", label: t("admin.manageItemsTitle") },
    { to: "/admin/inquiries", label: t("admin.manageInquiriesTitle") },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <span className="navbar-logo-mark" aria-hidden="true" />
        Ridgeline
        <span className="navbar-logo-sub">Admin</span>
      </div>
      <nav className="admin-sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              "admin-sidebar-link" + (isActive ? " admin-sidebar-link-active" : "")
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button
        className="admin-sidebar-logout"
        style={{ marginBottom: 12 }}
        onClick={() => setLang(lang === "en" ? "hi" : "en")}
      >
        {t("nav.toggle")}
      </button>
      <button className="admin-sidebar-logout" onClick={handleLogout}>
        {t("common.logOut")}
      </button>
    </aside>
  );
}
