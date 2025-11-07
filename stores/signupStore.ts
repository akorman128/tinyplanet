import { InviteCode } from "@/types/invite_code";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SignupData {
  inviteCode: InviteCode;
  fullName: string;
  birthday: string; // ISO string format
  hometown: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface SignupState {
  signupData: SignupData;
  setSignupData: (data: Partial<SignupData>) => void;
  clearSignupData: () => void;
}

const initialSignupData: SignupData = {
  inviteCode: {} as InviteCode,
  fullName: "",
  birthday: "",
  hometown: "",
};

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      signupData: initialSignupData,
      setSignupData: (data: Partial<SignupData>) =>
        set((state) => ({
          signupData: { ...state.signupData, ...data },
        })),
      clearSignupData: () => set({ signupData: initialSignupData }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
