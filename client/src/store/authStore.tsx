import { create } from "zustand";

interface AuthState {
  userId: string | null;
  name: string | null;
  role: string | null;
  avatar: string;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: {
    userId: string;
    role: string;
    avatar: string;
    token: string;
    name: string;
  }) => void;
  logout: () => void;
  setAvatar: (avatar: string) => void;
}

const getStoredAuthData = (): Partial<AuthState> => {
  return {
    userId: localStorage.getItem("userId"),
    role: localStorage.getItem("role"),
    avatar: localStorage.getItem("avatar") || "../../public/images.jpeg",
    token: localStorage.getItem("token"),
    name: localStorage.getItem("name"),
    isAuthenticated: !!localStorage.getItem("token"),
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  role: null,
  avatar: "default-avatar.png",
  token: null,
  name: null,
  isAuthenticated: false,

  ...getStoredAuthData(),

  login: ({ userId, role, avatar, token, name }) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    set({ userId, role, avatar, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("avatar");
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    set({
      name: null,
      userId: null,
      role: null,
      avatar: "../../public/images.jpeg",
      token: null,
      isAuthenticated: false,
    });
  },

  setAvatar: (avatar) => {
    localStorage.setItem("avatar", avatar);
    set({ avatar });
  },
}));
