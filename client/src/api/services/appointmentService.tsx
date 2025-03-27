// src/api/appointmentService.ts
import api from ".././axiosConfig";
import { ENDPOINTS, ApiResponse } from ".././endpoints";

export const AppointmentService = {
  bookAppointment: (appointmentData: any) =>
    api.post<ApiResponse<any>>(
      ENDPOINTS.APPOINTMENTS.BOOK_APPOINTMENT,
      appointmentData
    ),
  upcomingAppointents: (params?: { userId?: string }) =>
    api.get<ApiResponse<any[]>>(
      ENDPOINTS.APPOINTMENTS.GET_UPCOMING_APPOINTMENTS,
      {
        params,
      }
    ),
  patientAppointents: (params?: { userId?: string }) =>
    api.get<ApiResponse<any[]>>(
      ENDPOINTS.APPOINTMENTS.GET_PATIENT_APPOINTMENTS,
      {
        params,
      }
    ),
};
