import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthStore } from "@store/authStore";

interface ProfileFormData {
  name: string;
  email: string;
  avatar: FileList;
}

const Profile = () => {
  const avatar = useAuthStore((state) => state.avatar);

  const { register, handleSubmit, watch, setValue } =
    useForm<ProfileFormData>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await axios.post("/api/profile", formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle Avatar Preview
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatar", event.target.files as FileList);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
      {/* Avatar at the top & centered */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
          />
          <input
            type="file"
            accept="image/*"
            {...register("avatar")}
            onChange={handleAvatarChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mt-4">
        Profile Management
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            disabled
            placeholder="Ammar Nadeem"
            {...register("name", { required: true })}
            className="w-full p-2 border rounded"
            type="text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            disabled
            placeholder="ammar@gmail.com"
            {...register("email", { required: true })}
            className="w-full p-2 border rounded"
            type="email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
