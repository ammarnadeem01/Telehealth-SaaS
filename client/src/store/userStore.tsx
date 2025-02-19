import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void; // ✅ Returns void
  logoutUser: () => void; // ✅ Returns void
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logoutUser: () => set({ user: null }),
}));

export default useUserStore;
