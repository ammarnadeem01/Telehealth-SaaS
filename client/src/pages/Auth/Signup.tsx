import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@hooks/UseFetch";
import { IUser } from "@types/User";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    role: z.string().min(1, "Role is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterFormData = z.infer<typeof registerSchema>;
const Signup = () => {
  const { data, loading, error, triggerFetch } = useFetch<IUser>(
    "http://localhost:3000/api/v1/users/register"
  );
  const onSubmit = async (formData: RegisterFormData) => {
    await triggerFetch({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {[
            { label: "Name", type: "text", name: "name" as const },
            { label: "Email", type: "email", name: "email" as const },
            { label: "Password", type: "password", name: "password" as const },
            {
              label: "Confirm Password",
              type: "password",
              name: "confirmPassword" as const,
            },
            {
              label: "Phone Number",
              type: "text",
              name: "phoneNumber" as const,
            },
            { label: "Address", type: "textarea", name: "address" as const },
          ].map(({ label, type, name }) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  {...register(name)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={type}
                  {...register(name)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              )}
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
              )}
            </div>
          ))}

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-blue-500 hover:underline">
            Already have an account? Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
