// src/api/axiosConfig.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1", // Fallback URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAuthToken();
        localStorage.setItem("authToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// export default api;

// Token refresh function type
type RefreshTokenFunc = () => Promise<string>;

// Implement this function according to your auth flow
const refreshAuthToken: RefreshTokenFunc = async () => {
  // Your token refresh implementation
  const response = await axios.post("/auth/refresh");
  return response.data.accessToken;
};

export default api;
