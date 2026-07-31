import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const TOKEN_KEY = "plywood_admin_token";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inject the admin JWT (if present) into every outgoing request.
apiClient.interceptors.request.use((config) => {
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
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

// Flip VITE_USE_MOCK to "false" in .env once the backend is confirmed
// and this frontend has been wired up against its real response shapes.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export default apiClient;
