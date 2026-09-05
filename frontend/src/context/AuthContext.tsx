import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import * as authApi from "../api/auth";
import type { AdminLoginResponse } from "../types/models";

export interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AdminLoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => authApi.getToken());

  const login = useCallback(async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    setToken(data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setToken(null);
  }, []);

  const value: AuthContextValue = {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
