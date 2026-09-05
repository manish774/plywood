import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import * as userAuthApi from "../api/userAuth";
import type { MessageResponse, User, VerifyOtpResponse } from "../types/models";

export interface UserAuthContextValue {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  register: (name: string, email: string, phone: string) => Promise<MessageResponse>;
  login: (email: string) => Promise<MessageResponse>;
  verifyOtp: (email: string, otp: string) => Promise<VerifyOtpResponse>;
  resendOtp: (email: string) => Promise<MessageResponse>;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextValue | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => userAuthApi.getToken());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    userAuthApi.me().then(setUser).catch(() => {
      userAuthApi.logout();
      setToken(null);
    });
  }, [token]);

  const register = useCallback(
    (name: string, email: string, phone: string) => userAuthApi.register(name, email, phone),
    [],
  );

  const login = useCallback((email: string) => userAuthApi.login(email), []);

  const resendOtp = useCallback((email: string) => userAuthApi.resendOtp(email), []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    const data = await userAuthApi.verifyOtp(email, otp);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    userAuthApi.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value: UserAuthContextValue = {
    token,
    user,
    isAuthenticated: Boolean(token),
    register,
    login,
    verifyOtp,
    resendOtp,
    logout,
  };

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}

export function useUserAuth(): UserAuthContextValue {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within a UserAuthProvider");
  return ctx;
}
