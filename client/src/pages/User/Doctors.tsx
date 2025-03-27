import { UserService } from "@/api/services/userService";
import DoctorCard from "@/components/doctor/DoctorCard";
import { useState, useEffect } from "react";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  availableSlots: Record<string, TimeSlot[]>; // Changed to match schema
  image: string;
  languages: string[];
  consultationFee: number;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function DoctorList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [durationSlots, setDurationSlots] = useState<number>(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("search", searchTerm);
        if (selectedDays.length > 0)
          queryParams.append("days", selectedDays.join(","));
        if (durationSlots > 0)
          queryParams.append("duration", durationSlots.toString());

        const doctors: any = await UserService.getAllDoctors({
          search: searchTerm,
          // days: selectedDays.join(","),
          // duration: durationSlots,
        });
        console.log(doctors.data.data.doctors);
        setDoctors(doctors.data.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      fetchDoctors();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedDays, durationSlots]);

  const handleDaySelect = (day: string) => {
    if (!selectedDays.includes(day)) {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const removeDay = (dayToRemove: string) => {
    setSelectedDays(selectedDays.filter((day) => day !== dayToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Find Your Doctor
        </h1>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search doctors..."
              className="p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Day Selector */}
            <div className="relative">
              <select
                className="p-2 border rounded-md w-full"
                onChange={(e) => handleDaySelect(e.target.value)}
                value=""
              >
                <option value="">Select days</option>
                {daysOfWeek.map((day) => (
                  <option
                    key={day}
                    value={day}
                    disabled={selectedDays.includes(day)}
                  >
                    {day}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDays.map((day) => (
                  <span
                    key={day}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center"
                  >
                    {day}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-600 hover:text-blue-800"
                      onClick={() => removeDay(day)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <select
              className="p-2 border rounded-md"
              value={durationSlots}
              onChange={(e) => setDurationSlots(Number(e.target.value))}
            >
              <option value={0}>Any duration</option>
              <option value={1}>30 minutes</option>
              <option value={2}>1 hour</option>
              <option value={3}>1.5 hours</option>
              <option value={4}>2 hours</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-4">Loading doctors...</div>
        )}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => {
            console.log("2", doctor);
            return <DoctorCard doctor={doctor} durationSlots={durationSlots} />;
          })}
        </div>
      </div>
    </div>
  );
}
