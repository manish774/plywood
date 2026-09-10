import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInquiries } from "../../context/InquiriesContext";
import { useLanguage } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";
import SwastikIcon from "../icons/SwastikIcon";

interface SidebarLink {
  to: string;
  label: string;
  end?: boolean;
  badge?: number;
}

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const { pendingCount } = useInquiries();
  const { settings } = useSettings();

  const links: SidebarLink[] = [
    { to: "/admin", label: t("admin.dashboardTitle"), end: true },
    { to: "/admin/categories", label: t("admin.manageCategoriesTitle") },
    { to: "/admin/items", label: t("admin.manageItemsTitle") },
    { to: "/admin/inquiries", label: t("admin.manageInquiriesTitle"), badge: pendingCount },
    { to: "/admin/customization", label: t("admin.customizationTitle") },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <Link to="/" className="admin-sidebar-brand" title={t("admin.viewSite")}>
        {settings.logoUrl ? (
          <img src={settings.logoUrl} alt="" className="navbar-logo-mark" />
        ) : (
          <SwastikIcon className="navbar-logo-mark" />
        )}
        {settings.shortName}
        <span className="navbar-logo-sub">Admin</span>
      </Link>
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
            {!!link.badge && <span className="admin-sidebar-badge">{link.badge}</span>}
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
