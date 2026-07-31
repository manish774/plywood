import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/items", label: "Items" },
  { to: "/admin/inquiries", label: "Inquiries" },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
      <button className="admin-sidebar-logout" onClick={handleLogout}>
        Log out
      </button>
    </aside>
  );
}
