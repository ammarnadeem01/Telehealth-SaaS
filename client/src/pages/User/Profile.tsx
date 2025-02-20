import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "@store/authStore";

const Profile = () => {
  const avatar = useAuthStore((state) => state.avatar);
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const userId = useAuthStore((state) => state.userId);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    console.log(file, userId);
    if (userId) {
      formData.append("userId", userId);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/upload",
        formData
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // }
      );
      console.log(data);
      // setAvatarUrl(data.imageUrl);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/profile",
        formData
      );
      console.log(response);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
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
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mt-4">
        Profile Management
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            disabled
            value={name as string}
            className="w-full p-2 border rounded"
            type="text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            disabled
            value={email as string}
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
