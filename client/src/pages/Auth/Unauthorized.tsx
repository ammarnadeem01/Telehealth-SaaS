import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-xl mb-8">
        You do not have permission to view this page.
      </p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
