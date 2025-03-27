import { AppointmentService } from "@/api/services/appointmentService";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function DoctorCard({ doctor, durationSlots }: any) {
  const notify = (str: string) => toast(str);
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = (hours % 12 || 12).toString().padStart(2, "0"); // 2-digit format
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${period}`;
  };
  const userId = useAuthStore((state: any) => state.userId);
  const bookAppointment = async () => {
    try {
      console.log(doctor._id, userId, new Date(), durationSlots);
      const response: any = await AppointmentService.bookAppointment({
        doctor: doctor._id,
        patient: userId,
        date: new Date(
          new Date().setDate(new Date().getDate() + 1) - 2 * 60 * 60 * 1000
        ),
        duration: durationSlots * 30,
      });
      console.log("appointment", response);
      notify("Appointment Bookeds!");
    } catch (error: any) {
      notify(error.response.data.message);
      console.log("error in doc caard", error);
    }
  };
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav(`/doctor/${doctor._id}`);
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      <img
        src={doctor.profilePicture}
        alt={doctor.name}
        className="w-full h-48 object-cover"
      />
      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Doctor Info */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
          <span className="text-yellow-500">★ {doctor.rating}</span>
        </div>

        {/* Availability Section */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Availability:
          </p>
          <div className="flex flex-col space-y-2">
            {Object.entries(doctor.availableSlots).map(
              ([day, slots]: [string, any]) => (
                <div key={day} className="flex space-x-4">
                  {/* Day Column */}
                  <span className="w-24 font-semibold text-gray-700">
                    {day}
                  </span>

                  {/* Time Slots Column */}
                  <div className="flex flex-col space-y-1">
                    {slots.map((avail: any) => (
                      <span
                        key={avail._id}
                        className="px-2 py-1 bg-green-50 text-green-700 text-sm rounded-full w-52 text-center"
                      >
                        {formatTime(avail.startTime)} -{" "}
                        {formatTime(avail.endTime)}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-auto flex justify-between items-center">
          <p className="text-gray-600 font-medium">
            ${doctor.feePerSlot}/session
          </p>
          <button
            onClick={() => {
              bookAppointment();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
