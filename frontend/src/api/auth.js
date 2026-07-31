import apiClient, { USE_MOCK, TOKEN_KEY } from "./client";
import { mockApi } from "../mock/mockData";

export async function login(email, password) {
  if (USE_MOCK) {
    const data = await mockApi.login(email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  }
  const { data } = await apiClient.post("/admin/login", { email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export { TOKEN_KEY };
