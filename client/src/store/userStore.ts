import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the shape of the User and AuthState
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (authToken: string, user: User) => void;
  logout: () => void;
}

// Create the Zustand store
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      // Set token and user after login
      login: (authToken, user) => set({ token: authToken, user }),

      // Clear token and user on logout
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export default useAuthStore;
