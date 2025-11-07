import { useSupabase } from "./useSupabase";
import { useSignupStore } from "@/stores/signupStore";
import { useProfile } from "./useProfile";
import { useVibe } from "./useVibe";
import { useInviteCodes } from "./useInviteCodes";
import { InviteCodeStatus } from "@/types/invite_code";
import { useFriends } from "./useFriends";

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
  const { getVibes, updateVibe } = useVibe();
  const { redeemInviteCode } = useInviteCodes();
  const { createFriend } = useFriends();
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

    const userId = data.user.id;

    // Critical operation - must succeed
    await createProfile({
      id: userId,
      phone_number: phone,
      full_name: signupData.fullName,
      hometown: signupData.hometown,
      birthday: signupData.birthday,
      location: signupData.location,
      inviter_id: signupData.inviteCode.inviter_id,
    });

    // Non-critical: Link vibes
    try {
      const { data: vibes } = await getVibes({
        inviteCodeId: signupData.inviteCode.id,
      });
      if (vibes && vibes.length > 0) {
        await updateVibe({
          vibeId: vibes[0].id,
          receiverId: userId,
        });
      }
    } catch (error) {
      console.error("Failed to link vibes:", error);
      // Continue - not critical
    }

    // Non-critical: Create friend relationship
    try {
      await createFriend({
        currentUserId: userId,
        targetUserId: signupData.inviteCode.inviter_id,
      });
    } catch (error) {
      console.error("Failed to create friend relationship:", error);
      // Continue - not critical
    }

    // Non-critical: Redeem invite code
    try {
      await redeemInviteCode({
        code: signupData.inviteCode.code,
      });
    } catch (error) {
      console.error("Failed to redeem invite code:", error);
      // Continue - not critical
    }

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
