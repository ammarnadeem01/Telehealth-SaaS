// src/pages/Signup.jsx
// import React from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setProfilePicture(file); // Save the file to state
  };
  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", data.role);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);

    // Append the profile picture (if any)
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    axios
      .post("http://localhost:3000/api/v1/users/register", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )} */}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )} */}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )} */}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )} */}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Doctor</option>
              <option value="admin"></option>
            </select>
            {/* {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )} */}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )} */}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )} */}
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label className="block w-full h-20 text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              //   onChange={handleFileChange}
              {...register("profilePicture", {
                required: "Profile picture is required",
              })}
              className="w-full absolute hidden p-2 mt-1 px-14 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.profilePicture && (
              <p className="text-red-500 text-sm">
                {errors.profilePicture.message}
              </p>
            )} */}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
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
