import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Profile } from "../types/profile";

export interface ProfileState {
  // Data (persisted to AsyncStorage)
  profileState: Profile | null;

  // Loading states (ephemeral - NOT persisted)
  isLoading: boolean;
  error: Error | null;

  // Actions
  setProfileState: (profileState: Profile) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setProfileError: (error: Error) => void;
  removeProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profileState: null,
      isLoading: false,
      error: null,
      setProfileState: (profileState: Profile) =>
        set({ profileState, error: null }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: Error | null) => set({ error }),
      setProfileError: (error: Error) => set({ error, isLoading: false }),
      removeProfile: () =>
        set({ profileState: null, isLoading: false, error: null }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ profileState: state.profileState }),
    }
  )
);
