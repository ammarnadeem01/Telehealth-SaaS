import React from "react";

const EmailSent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Check Your Email
        </h2>
        <p className="text-gray-600">
          We've sent a password reset link to your email. Please check your
          inbox and follow the instructions to reset your password.
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Didn't receive the email?</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => alert("Resend email clicked!")}
          >
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
