// src/pages/RoleSelection.tsx
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Join as...</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate("/signup/doctor")}
            className="group relative w-full flex justify-center items-center p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold text-blue-600">Doctor</h3>
              <p className="text-gray-600 mt-1">
                Register to provide healthcare services and manage appointments
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/signup/patient")}
            className="group relative w-full flex justify-center items-center p-6 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            <div className="text-left">
              <h3 className="text-xl font-semibold text-green-600">Patient</h3>
              <p className="text-gray-600 mt-1">
                Register to book appointments and manage your health
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
