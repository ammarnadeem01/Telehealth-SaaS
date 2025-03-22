// src/components/Login.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { UserService } from "@/api/services/userService";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: any, token: string) => {
    useAuthStore.getState().login({
      userId: data._id,
      role: data.role,
      avatar: data.profilePicture,
      token,
      name: data.name,
      email: data.email,
    });
  };

  const onSubmit = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      // Use the login method from our UserService
      const response: any = await UserService.login(formData);
      console.log(response);
      // Assumes the response contains both user data and a token
      if (response?.data && response.token) {
        handleLogin(response.data, response.token);
        navigate("/profile");
      }
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <p className="text-red-600 text-center py-2">
            <NavLink to="/forgot-password">Forgot Password?</NavLink>
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <NavLink
            to="/signup"
            className="text-sm text-blue-500 hover:underline"
          >
            Don't have an account? Sign Up
          </NavLink>
          <a href="http://localhost:3000/auth/google" className="block mt-2">
            Login With Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
