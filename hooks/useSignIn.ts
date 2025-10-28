import { useSupabase } from "./useSupabase";
import { useProfileStore } from "@/stores/profileStore";
import { useProfile } from "./useProfile";

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
  const { setProfileState } = useProfileStore();

  const signInWithPhoneNumber = async (
    input: signInWithPhoneNumberDto
  ): Promise<void> => {
    const { phone } = input;
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) throw error;
  };

  const verifyOtp = async (input: verifyOtpDto): Promise<void> => {
    const { phone, token } = input;
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });
    if (error) throw error;

    if (!data?.user) throw new Error("User not found");

    const user = await getProfile({ userId: data.user.id });

    setProfileState(user);
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

    // GET USER
    setProfileState(user);
  };

  return {
    isLoaded,
    signInWithPassword,
    signInWithPhoneNumber,
    verifyOtp,
  };
};
