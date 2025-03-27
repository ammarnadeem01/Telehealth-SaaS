// src/pages/dashboard/MedicalHistory.tsx
import { useState } from "react";

const medicalHistory = [
  {
    date: "2024-02-15",
    doctor: "Dr. Sarah Johnson",
    diagnosis: "Upper Respiratory Infection",
    prescription: "Amoxicillin 500mg",
    notes: "Recommended rest and hydration",
  },
  {
    date: "2023-11-30",
    doctor: "Dr. Michael Chen",
    diagnosis: "Annual Checkup",
    prescription: "None",
    notes: "All vitals normal, recommended continued exercise",
  },
];

const MedicalHistory = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Medical History</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Prescription
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicalHistory.map((record, index) => (
              <>
                <tr
                  key={index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setExpandedRow(expandedRow === index ? null : index)
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.diagnosis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.prescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      {expandedRow === index ? "Hide" : "Show"} Details
                    </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr className="bg-blue-50">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="space-y-2">
                        <p className="font-medium">Doctor's Notes:</p>
                        <p className="text-gray-600">{record.notes}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalHistory;
