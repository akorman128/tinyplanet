import { useSupabase } from "./useSupabase";
import { useSignupStore } from "@/stores/signupStore";
import { useProfile } from "./useProfile";

interface signUpWithPhoneNumberDto {
  phone: string;
}

interface verifyOtpForSignUpDto {
  phone: string;
  token: string;
}

export const useSignUp = () => {
  const { isLoaded, supabase } = useSupabase();
  const { createProfile } = useProfile();
  const { signupData, clearSignupData } = useSignupStore();

  const signUpWithEmail = async ({
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

  const verifyOtpWithEmail = async ({
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
      options: {
        shouldCreateUser: true,
        channel: "sms",
      },
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

    if (!data.user) throw new Error("User not found");

    // Create new profile for the user using signup store data
    await createProfile({
      id: data.user.id,
      phone_number: phone,
      full_name: signupData.fullName,
      hometown: signupData.hometown,
      birthday: signupData.birthday,
      location: signupData.location,
      inviter_id: signupData.inviterId,
    });

    // Clear signup data after successful profile creation
    clearSignupData();
  };

  return {
    isLoaded,
    signUpWithEmail,
    verifyOtpWithEmail,
    signUpWithPhoneNumber,
    verifyOtpAndCreateProfile,
  };
};
