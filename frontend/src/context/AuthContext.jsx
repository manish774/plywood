import { createContext, useContext, useState, useCallback } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => authApi.getToken());

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    setToken(data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setToken(null);
  }, []);

  const value = {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
