import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "@/hooks/UseFetch";
import { useAuthStore } from "@/store/authStore";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}
interface ResetFormData {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();
  const searchParams = useParams();
  let token = searchParams.token;
  const [message, setMessage] = useState<string | null>(null);
  const { data, loading, error, triggerFetch } = useFetch<any>(
    `http://localhost:3000/api/v1/users/reset-password/${token}`
  );
  const handleResetPassword = (data: any, _token: string) => {
    console.log(data);
    useAuthStore.getState().login({
      userId: data._id,
      role: data.role,
      avatar: data.profilePicture,
      token: _token,
      name: data.name,
      email: data.email,
    });
  };

  const onSubmit = async (formData: any) => {
    await triggerFetch({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!loading && data) {
      console.log(data);
      handleResetPassword(data.data, data.token);
      nav("/profile");
    }
    if (error) {
      console.log(error);
    }
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        {message && <p className="text-sm text-gray-700 mb-3">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter new password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full p-2 border rounded mt-1"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
