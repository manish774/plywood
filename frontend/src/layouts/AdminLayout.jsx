import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import "../styles/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
