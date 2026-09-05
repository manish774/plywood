import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useUserAuth } from "../../context/UserAuthContext";

interface UserProtectedRouteProps {
  children: ReactNode;
}

export default function UserProtectedRoute({ children }: UserProtectedRouteProps) {
  const { isAuthenticated } = useUserAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/account" replace state={{ from: location }} />;
  }

  return children;
}
