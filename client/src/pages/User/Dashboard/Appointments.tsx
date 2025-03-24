// src/pages/dashboard/Appointments.tsx
import { AppointmentService } from "@/api/services/appointmentService";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AppointmentsUser = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const userId = useAuthStore((state: any) => state.userId);
  async function setAppointmentsFunc() {
    const response: any = await AppointmentService.patientAppointents({
      userId,
    });
    console.log("data", response.data);
    setAppointments(response.data);
  }
  useEffect(() => {
    setAppointmentsFunc();
  }, [userId]);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        {/* <Link
          to="/dashboard/appointments/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Book New Appointment
        </Link> */}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {appointment.doctor.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">
                      {new Date(appointment.date).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-sm rounded-full ${
                        appointment.status === "Upcoming"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      {appointment.status === "Upcoming"
                        ? "Join Call"
                        : "View Details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsUser;
