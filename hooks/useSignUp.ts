import { useSupabase } from "./useSupabase";
import { useProfileStore } from "../stores/profileStore";

interface signUpWithPhoneNumberDto {
  phone: string;
}

interface verifyOtpForSignUpDto {
  phone: string;
  token: string;
}

export const useSignUp = () => {
  const { isLoaded, supabase } = useSupabase();
  const { setProfileState } = useProfileStore();

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const verifyOtp = async ({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) throw error;
  };

  const signUpWithPhoneNumber = async (
    input: signUpWithPhoneNumberDto
  ): Promise<void> => {
    const { phone } = input;
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) throw error;
  };

  const verifyOtpAndCreateProfile = async (
    input: verifyOtpForSignUpDto
  ): Promise<void> => {
    const { phone, token } = input;
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });
    if (error) throw error;

    if (!data?.user) throw new Error("User not found");

    // Create new profile for the user
    const { data: newProfile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        phone_number: phone,
        full_name: "",
        avatar_url: "",
        website: "",
        hometown: "",
        birthday: "",
        location: "",
      })
      .select()
      .single();

    if (profileError) throw profileError;

    setProfileState(newProfile);
  };

  return {
    isLoaded,
    signUp,
    verifyOtp,
    signUpWithPhoneNumber,
    verifyOtpAndCreateProfile,
  };
};
