// src/api/endpoints.ts
interface Endpoints {
  USERS: {
    GET_DOCTOR_LIST: string;
    GET_PATIENT_LIST: string;
    CREATE_DOCTOR: "";
    DETAIL: (id: string) => string;
    REGISTER: string;
    LOGIN: string;
  };
}

export const ENDPOINTS: Endpoints = {
  USERS: {
    GET_DOCTOR_LIST: "/users/get-all-doctors",
    GET_PATIENT_LIST: "/users/get-all-patients",
    CREATE_DOCTOR: "",
    DETAIL: (id: string) => `/users/${id}`,
    REGISTER: "/users/register",
    LOGIN: "/users/login",
  },
} as const;

// Utility type for API response shapes
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

// Example user type extension
export type UserDTO = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
