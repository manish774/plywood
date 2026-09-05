import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserAuthProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import UserProtectedRoute from "./components/public/UserProtectedRoute";
import { LanguageProvider } from "./i18n/useLanguage";
import ScrollToTop from "./components/ScrollToTop";

import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import Categories from "./pages/public/Categories";
import CategoryDetail from "./pages/public/CategoryDetail";
import ItemDetail from "./pages/public/ItemDetail";
import Contact from "./pages/public/Contact";
import Account from "./pages/public/Account";
import MyQueries from "./pages/public/MyQueries";
import NotFound from "./pages/public/NotFound";

import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageItems from "./pages/admin/ManageItems";
import Inquiries from "./pages/admin/Inquiries";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <UserAuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public site */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/items/:id" element={<ItemDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={<Account />} />
              <Route
                path="/my-queries"
                element={
                  <UserProtectedRoute>
                    <MyQueries />
                  </UserProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="items" element={<ManageItems />} />
              <Route path="inquiries" element={<Inquiries />} />
            </Route>
          </Routes>
        </UserAuthProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
