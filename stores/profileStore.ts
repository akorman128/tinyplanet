import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Profile } from "../types/profile";

export interface ProfileState {
  profileState: Profile | null;
  setProfileState: (profileState: Profile) => void;
  removeProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profileState: null,
      setProfileState: (profileState: Profile) => set({ profileState }),
      removeProfile: () => set({ profileState: null }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
