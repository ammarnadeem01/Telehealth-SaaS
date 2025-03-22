// src/api/userService.ts
import api from ".././axiosConfig";
import { ENDPOINTS, ApiResponse, UserDTO } from ".././endpoints";

export const UserService = {
  // getAllDoctors: () =>
  //   api.get<ApiResponse<UserDTO[]>>(ENDPOINTS.USERS.DOCTOR_LIST),
  getById: (id: string) =>
    api.get<ApiResponse<UserDTO>>(ENDPOINTS.USERS.DETAIL(id)),
  // create: (userData: Omit<UserDTO, "id" | "createdAt" | "updatedAt">) =>
  //   api.post<ApiResponse<UserDTO>>(ENDPOINTS.USERS.DOCTOR_LIST, userData),
  update: (id: string, userData: Partial<UserDTO>) =>
    api.patch<ApiResponse<UserDTO>>(ENDPOINTS.USERS.DETAIL(id), userData),
  delete: (id: string) =>
    api.delete<ApiResponse<void>>(ENDPOINTS.USERS.DETAIL(id)),
  register: (
    userData: Omit<UserDTO, "id" | "createdAt" | "updatedAt"> & {
      password: string;
      confirmPassword: string;
      timezone: string;
    }
  ) => api.post<ApiResponse<UserDTO>>(ENDPOINTS.USERS.REGISTER, userData),
  login: (credentials: { email: string; password: string }) =>
    api.post<ApiResponse<UserDTO>>(ENDPOINTS.USERS.LOGIN, credentials),
};
