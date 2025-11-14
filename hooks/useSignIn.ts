import { useSupabase } from "./useSupabase";
import { useProfileStore } from "@/stores/profileStore";
import { useProfile } from "./useProfile";
import { useLocation } from "./useLocation";

interface signInWithPhoneNumberDto {
  phone: string;
}

interface signInWithPasswordDto {
  email: string;
  password: string;
}

interface verifyOtpDto {
  phone: string;
  token: string;
}

export const useSignIn = () => {
  const { isLoaded, supabase } = useSupabase();
  const { getProfile } = useProfile();
  const { updateLocationInDatabase } = useLocation();
  const { setProfileState } = useProfileStore();

  const updateUserLocation = async (): Promise<void> => {
    try {
      await updateLocationInDatabase();
    } catch (error) {
      console.error("Failed to update location on sign-in:", error);
    }
  };

  const signInWithPhoneNumber = async (
    input: signInWithPhoneNumberDto
  ): Promise<void> => {
    const { phone } = input;

    // Supabase Auth will only send OTP if user exists with shouldCreateUser: false
    // This prevents new user creation and doesn't expose phone numbers to unauthenticated users
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        shouldCreateUser: false,
      },
    });

    if (error) throw error;
  };

  const verifyOtp = async (input: verifyOtpDto): Promise<void> => {
    const { phone, token } = input;
    const {
      data: { user },
      error,
    } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });
    if (error) throw error;

    if (!user) throw new Error("User not found");

    const profile = await getProfile({ userId: user.id });

    setProfileState(profile);

    try {
      await updateUserLocation();
    } catch (error) {
      console.error("Failed to update location on sign-in:", error);
    }
  };

  const signInWithPassword = async (
    input: signInWithPasswordDto
  ): Promise<void> => {
    const { email, password } = input;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const user = await getProfile({ userId: data.user.id });

    setProfileState(user);

    // Update location after successful sign-in
    await updateUserLocation();
  };

  return {
    isLoaded,
    signInWithPassword,
    signInWithPhoneNumber,
    verifyOtp,
  };
};
