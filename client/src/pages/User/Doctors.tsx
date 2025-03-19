import DoctorCard from "@/components/doctor/DoctorCard";
import { useState } from "react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  availability: string;
  image: string;
  languages: string[];
  consultationFee: number;
}

export default function DoctorList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [minRating, setMinRating] = useState(0);

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: 12,
      rating: 4.9,
      availability: "today",
      image: "https://placehold.co/150x150.png",
      languages: ["English", "Spanish"],
      consultationFee: 150,
    },
    {
      id: "2",
      name: "Dr. Michael Smith",
      specialty: "Dermatology",
      experience: 8,
      rating: 4.7,
      availability: "tomorrow",
      image: "https://placehold.co/150x150.png",
      languages: ["English"],
      consultationFee: 120,
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      specialty: "Pediatrics",
      experience: 10,
      rating: 4.8,
      availability: "today",
      image: "https://placehold.co/150x150.png",
      languages: ["English", "French"],
      consultationFee: 130,
    },
    {
      id: "4",
      name: "Dr. David Wilson",
      specialty: "Neurology",
      experience: 15,
      rating: 4.6,
      availability: "next week",
      image: "https://placehold.co/150x150.png",
      languages: ["English", "German"],
      consultationFee: 180,
    },
    {
      id: "5",
      name: "Dr. Olivia Martinez",
      specialty: "Orthopedics",
      experience: 9,
      rating: 4.5,
      availability: "today",
      image: "https://placehold.co/150x150.png",
      languages: ["English", "Spanish"],
      consultationFee: 160,
    },
  ];
  const specialties = ["Cardiology", "Dermatology", "Pediatrics", "Neurology"];
  const availabilityOptions = ["today", "tomorrow", "this-week"];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesAvailability =
      !selectedAvailability || doctor.availability === selectedAvailability;
    const matchesRating = doctor.rating >= minRating;

    return (
      matchesSearch && matchesSpecialty && matchesAvailability && matchesRating
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Find Your Doctor
        </h1>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search doctors..."
              className="p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border rounded-md"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <select
              className="p-2 border rounded-md"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="">Any Availability</option>
              <option value="today">Available Today</option>
              <option value="tomorrow">Available Tomorrow</option>
              <option value="this-week">This Week</option>
            </select>
            <select
              className="p-2 border rounded-md"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value={0}>All Ratings</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors &&
            filteredDoctors.map((doctor) => <DoctorCard doctor={doctor} />)}
        </div>
      </div>
    </div>
  );
}
