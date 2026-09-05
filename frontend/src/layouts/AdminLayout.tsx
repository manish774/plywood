import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { InquiriesProvider } from "../context/InquiriesContext";
import "../styles/admin.css";

export default function AdminLayout() {
  return (
    <InquiriesProvider>
      <div className="admin-shell">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </InquiriesProvider>
  );
}
