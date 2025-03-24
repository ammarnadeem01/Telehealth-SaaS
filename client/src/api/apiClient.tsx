import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  error?: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" }),
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiResponse>) => {
    const errorMessage = error.response?.data?.error || "Request failed";
    console.error("API Error:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
