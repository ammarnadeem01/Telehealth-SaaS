// src/pages/DoctorAvailability.tsx
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
// import { DoctorService } from "@/api/services/doctorService";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface AvailabilityData {
  [key: string]: TimeSlot[];
}

const DoctorAvailability = () => {
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.userId);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityData>({});
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchAvailability = async () => {
      if (role === "doctor") {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/v1/doctorAvailability/get-doctor-availability/${userId}`
          );
          console.log(res);
          //   setAvailability(res.availableSlots || {});
        } catch (error) {
          toast.error("Failed to load existing availability");
        }
      }
    };
    fetchAvailability();
  }, [userId]);

  const handleAddSlot = () => {
    if (!startTime || !endTime) {
      toast.error("Please select both start and end times");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    const newSlot = {
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
    };

    setAvailability((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newSlot],
    }));
  };

  const handleRemoveSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/doctorAvailability/create-doctor-availability",
        { doctorId: userId, availability }
      );
      console.log("res", res);
      toast.success("Availability updated successfully!");
    } catch (error) {
      toast.error("Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  if (role !== "doctor") {
    return (
      <div className="p-8 text-center text-red-500">
        This page is only accessible to doctors
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Set Your Availability</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date: any) => date && setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => date && setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <button
              onClick={handleAddSlot}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Add Time Slot
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {daysOfWeek.map(
            (day) =>
              availability[day]?.length > 0 && (
                <div key={day} className="border rounded-md p-4">
                  <h3 className="font-semibold mb-2">{day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availability[day].map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span>
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <button
                          onClick={() => handleRemoveSlot(day, index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
