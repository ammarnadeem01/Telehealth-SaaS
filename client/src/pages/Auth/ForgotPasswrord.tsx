import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/forgot-password",
        data
      );
      console.log(data, response);
      console.log(data);
      nav("/email-sent");
      // setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {message && <p className="text-sm text-gray-700 mb-3">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
