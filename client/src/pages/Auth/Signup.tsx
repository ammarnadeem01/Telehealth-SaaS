// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import useFetch from "@/hooks/UseFetch";
// import { IUser } from "@/interfaces/User";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "@/store/authStore";
// import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from "react-icons/fi";

// const registerSchema = z
//   .object({
//     name: z.string().min(1, "Name is required"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string().min(1, "Confirm password is required"),
//     role: z.string().min(1, "Role is required"),
//     phoneNumber: z.string().min(10, "Valid phone number is required"),
//     address: z.string().min(10, "Address must be at least 10 characters"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type RegisterFormData = z.infer<typeof registerSchema>;

// const Signup = () => {
//   const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const navigate = useNavigate();
//   const { data, loading, error, triggerFetch } = useFetch<IUser>(
//     "http://localhost:3000/api/v1/users/register"
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   const handleLogin = (userData: any, token: string) => {
//     useAuthStore.getState().login({
//       userId: userData._id,
//       role: userData.role,
//       avatar: userData.profilePicture,
//       token: token,
//       name: userData.name,
//       email: userData.email,
//     });
//   };

//   const onSubmit = async (formData: RegisterFormData) => {
//     const response = await triggerFetch({
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formData, timezone: userTimezone }),
//     });
//     console.log(response);
//     if (response?.data && !error) {
//       handleLogin(response.data, response.token);
//       navigate("/profile");
//     }
//   };

//   const inputFields = [
//     {
//       label: "Full Name",
//       name: "name",
//       icon: <FiUser className="text-gray-400" />,
//       type: "text",
//     },
//     {
//       label: "Email Address",
//       name: "email",
//       icon: <FiMail className="text-gray-400" />,
//       type: "email",
//     },
//     {
//       label: "Password",
//       name: "password",
//       icon: <FiLock className="text-gray-400" />,
//       type: "password",
//       info: "Minimum 6 characters",
//     },
//     {
//       label: "Confirm Password",
//       name: "confirmPassword",
//       icon: <FiLock className="text-gray-400" />,
//       type: "password",
//     },
//     {
//       label: "Phone Number",
//       name: "phoneNumber",
//       icon: <FiPhone className="text-gray-400" />,
//       type: "tel",
//     },
//     {
//       label: "Address",
//       name: "address",
//       icon: <FiMapPin className="text-gray-400" />,
//       type: "textarea",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-11/12 bg-white rounded-2xl shadow-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Side - Illustration */}
//           <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 p-8">
//             <div className="h-full flex flex-col justify-center text-white">
//               <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
//               <p className="text-lg opacity-90">
//                 Start your journey with us and experience premium healthcare
//                 services.
//               </p>
//               <div className="mt-8">
//                 <div className="h-64 bg-white/10 rounded-lg backdrop-blur-sm" />
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div className="w-full md:w-1/2 p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 Create Account
//               </h1>
//               <p className="text-gray-500">
//                 Already registered?{" "}
//                 <a
//                   href="/login"
//                   className="text-blue-600 hover:underline font-medium"
//                 >
//                   Sign in here
//                 </a>
//               </p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {inputFields.map((field) => (
//                   <div
//                     key={field.name}
//                     className={`${
//                       field.type === "textarea" ? "col-span-2" : ""
//                     }`}
//                   >
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {field.label}
//                     </label>
//                     <div className="relative">
//                       <div className="absolute left-3 top-3.5">
//                         {field.icon}
//                       </div>
//                       {field.type === "textarea" ? (
//                         <textarea
//                           {...register(field.name as any)}
//                           className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           rows={3}
//                           placeholder={`Enter your ${field.label.toLowerCase()}`}
//                         />
//                       ) : (
//                         <input
//                           type={field.type}
//                           {...register(field.name as any)}
//                           className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder={`Enter your ${field.label.toLowerCase()}`}
//                         />
//                       )}
//                     </div>
//                     {errors[field.name as keyof RegisterFormData] && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors[field.name as keyof RegisterFormData]?.message}
//                       </p>
//                     )}
//                     {field.info && (
//                       <p className="text-gray-500 text-sm mt-1">{field.info}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Role
//                 </label>
//                 <select
//                   {...register("role")}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="doctor">Doctor</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 {errors.role && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.role.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Creating Account...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>

//               {error && (
//                 <p className="text-red-500 text-center mt-4">
//                   {error.message || "Registration failed. Please try again."}
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
// src/components/Signup.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { UserService } from "@/api/services/userService";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    role: z.string().min(1, "Role is required"),
    phoneNumber: z.string().min(10, "Valid phone number is required"),
    address: z.string().min(10, "Address must be at least 10 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Signup = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Handles storing user data after registration/login
  const handleLogin = (userData: any, token: string) => {
    useAuthStore.getState().login({
      userId: userData._id,
      role: userData.role,
      avatar: userData.profilePicture,
      token: token,
      name: userData.name,
      email: userData.email,
    });
  };

  const onSubmit = async (formData: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      // Using the UserService.register method from our architecture
      const response: any = await UserService.register({
        ...formData,
        timezone: userTimezone,
      });
      console.log(response);
      // Assumes the response contains a token along with user data
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

  const inputFields = [
    {
      label: "Full Name",
      name: "name",
      icon: <FiUser className="text-gray-400" />,
      type: "text",
    },
    {
      label: "Email Address",
      name: "email",
      icon: <FiMail className="text-gray-400" />,
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      icon: <FiLock className="text-gray-400" />,
      type: "password",
      info: "Minimum 6 characters",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      icon: <FiLock className="text-gray-400" />,
      type: "password",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      icon: <FiPhone className="text-gray-400" />,
      type: "tel",
    },
    {
      label: "Address",
      name: "address",
      icon: <FiMapPin className="text-gray-400" />,
      type: "textarea",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-11/12 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Illustration */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 p-8">
            <div className="h-full flex flex-col justify-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg opacity-90">
                Start your journey with us and experience premium healthcare
                services.
              </p>
              <div className="mt-8">
                <div className="h-64 bg-white/10 rounded-lg backdrop-blur-sm" />
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
              </h1>
              <p className="text-gray-500">
                Already registered?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in here
                </a>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputFields.map((field) => (
                  <div
                    key={field.name}
                    className={`${
                      field.type === "textarea" ? "col-span-2" : ""
                    }`}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5">
                        {field.icon}
                      </div>
                      {field.type === "textarea" ? (
                        <textarea
                          {...register(field.name as any)}
                          className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          {...register(field.name as any)}
                          className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                      )}
                    </div>
                    {errors[field.name as keyof RegisterFormData] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name as keyof RegisterFormData]?.message}
                      </p>
                    )}
                    {field.info && (
                      <p className="text-gray-500 text-sm mt-1">{field.info}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  {...register("role")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                  <option value="admin">Patient</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
