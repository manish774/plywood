import apiClient, { USE_MOCK, TOKEN_KEY } from "./client";
import { mockApi } from "../mock/mockData";
import type { AdminLoginResponse } from "../types/models";

export async function login(email: string, password: string): Promise<AdminLoginResponse> {
  if (USE_MOCK) {
    const data = await mockApi.login(email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  }
  const { data } = await apiClient.post<AdminLoginResponse>("/admin/login", { email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export { TOKEN_KEY };
