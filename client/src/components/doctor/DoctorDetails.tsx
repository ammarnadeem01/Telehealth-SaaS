import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppointmentService } from "@/api/services/appointmentService";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

function DoctorDetails() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const userId = useAuthStore((state: any) => state.userId);

  // Mock data - replace with actual API call
  const doctor = {
    _id: id,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    feePerSlot: 150,
    profilePicture: "https://dummyimage.com/150x150/bababa/fff",
    bio: "Board-certified cardiologist with 10+ years of experience...",
    education: [
      "MD, Harvard Medical School",
      "Residency at Johns Hopkins Hospital",
    ],
    experience: [
      "Senior Cardiologist at City Hospital (2015-present)",
      "Cardiology Fellow at Mayo Clinic (2012-2015)",
    ],
    availableSlots: {
      Monday: [
        { startTime: "09:00", endTime: "11:00" },
        { startTime: "14:00", endTime: "17:00" },
        ``,
      ],
      Wednesday: [{ startTime: "10:00", endTime: "13:00" }],
      Friday: [{ startTime: "08:00", endTime: "12:00" }],
    },
    contact: {
      address: "123 Medical Drive, Health City, HC 12345",
      phone: "(555) 123-4567",
      email: "s.johnson@medicalcenter.com",
    },
    reviews: [
      {
        patient: "John D.",
        rating: 5,
        comment: "Excellent care and attention to detail!",
      },
      {
        patient: "Maria S.",
        rating: 4,
        comment: "Very professional and knowledgeable",
      },
    ],
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = (hours % 12 || 12).toString().padStart(2, "0");
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${period}`;
  };

  const getDaySlots = () => {
    const dayName = format(selectedDate, "EEEE");
    return (
      doctor.availableSlots[dayName as keyof typeof doctor.availableSlots] || []
    );
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
            <p className="text-xl text-gray-600 mb-4">{doctor.specialty}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-500 text-xl">★ {doctor.rating}</span>
              <span className="text-xl font-semibold">
                ${doctor.feePerSlot}/session
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Info Sections */}
        <div className="md:col-span-2 space-y-8">
          {/* About Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-600 mb-6">{doctor.bio}</p>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Education</h3>
              <ul className="list-disc list-inside space-y-2">
                {doctor.education.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Reviews Section */}
          {/* <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Patient Reviews</h2>
            <div className="space-y-4">
              {doctor.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.patient}</span>
                    <span className="text-yellow-500">★ {review.rating}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </section> */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600">📍 {doctor.contact.address}</p>
              <p className="text-gray-600">📞 {doctor.contact.phone}</p>
              <p className="text-gray-600">✉️ {doctor.contact.email}</p>
            </div>
          </section>
        </div>

        {/* Right Column - Booking Section */}
        <div className="space-y-8">
          {/* Availability Section */}
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

          {/* Contact Section */}
          {/* <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600">📍 {doctor.contact.address}</p>
              <p className="text-gray-600">📞 {doctor.contact.phone}</p>
              <p className="text-gray-600">✉️ {doctor.contact.email}</p>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
