import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppointmentService } from "@/api/services/appointmentService";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import { UserService } from "@/api/services/userService";
import axios from "axios";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const userId = useAuthStore((state: any) => state.userId);
  useEffect(() => {
    const fetchAvailability = async () => {
      if (doctor && selectedDate) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/doctorAvailability/availability/${id}`,
            {
              params: { date: selectedDate },
            }
          );
          setAvailableSlots(response.data);
        } catch (error) {
          toast.error("Failed to load available slots");
        }
      }
    };
    fetchAvailability();
  }, [selectedDate, doctor]);
  useEffect(() => {
    const fetchDoctorDetails = async (id: string) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${id}`
        );
        setDoctor(response.data.data.user[0]);
        // setDoctor(response.data);
      } catch (error) {
        toast.error("Failed to load doctor details");
        console.error("Error fetching doctor:", error);
      }
    };

    if (id) fetchDoctorDetails(id);
  }, [id]);

  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = (hours % 12 || 12).toString().padStart(2, "0");
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${period}`;
  };

  const getDaySlots = () => {
    const dayName = format(selectedDate, "EEEE");
    return doctor.availableSlots?.[dayName] || [];
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      const response = await AppointmentService.bookAppointment({
        doctor: doctor._id,
        patient: userId,
        date: selectedDate,
        duration: 30, // Assuming 30-minute slots
      });

      toast.success("Appointment booked successfully!");
      console.log("Booking confirmation:", response);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Booking failed");
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Doctor Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={doctor.profilePicture}
            alt={doctor.name}
            className="w-48 h-48 rounded-full object-cover mx-auto"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
            <p className="text-xl text-gray-600 mb-4">
              {doctor.specialization}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-500 text-xl">★ {doctor.rating}</span>
              <span className="text-xl font-semibold">
                ${doctor.feePerSlot}/session
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Date
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setSelectedDate(parseISO(e.target.value))}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Available Slots</h3>
            <div className="grid grid-cols-2 gap-2">
              {getDaySlots().map((slot: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot.startTime)}
                  className={`p-2 text-sm rounded-md ${
                    selectedSlot === slot.startTime
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </section>
    </div>
  );
}

export default DoctorDetails;
