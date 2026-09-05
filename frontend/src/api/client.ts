import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const TOKEN_KEY = "plywood_admin_token";
export const USER_TOKEN_KEY = "plywood_user_token";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inject the admin JWT (if present) into every outgoing request.
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralize "unauthorized" handling: clear the stale token so the
// ProtectedRoute wrapper bounces the user back to /admin/login.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

// Separate axios instance for customer-account requests, so an admin
// session in the same browser never has its JWT sent on shopper endpoints
// (and vice versa).
export const userApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

userApiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

userApiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(USER_TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

// Flip VITE_USE_MOCK to "false" in .env once the backend is confirmed
// and this frontend has been wired up against its real response shapes.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export default apiClient;
