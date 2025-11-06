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
  const { getInviteCodes } = useInviteCodes();
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

    // Create new profile for the user using signup store data
    await createProfile({
      id: userId,
      phone_number: phone,
      full_name: signupData.fullName,
      hometown: signupData.hometown,
      birthday: signupData.birthday,
      location: signupData.location,
      inviter_id: signupData.inviterId,
    });

    // Link any vibes associated with the invite code to this user
    try {
      // Get the invite code record
      const { data: inviteCodes } = await getInviteCodes({
        filters: {
          code: signupData.inviteCode,
          status: InviteCodeStatus.REDEEMED,
        },
      });

      if (inviteCodes && inviteCodes.length > 0) {
        const inviteCodeId = inviteCodes[0].id;

        // Get vibes associated with this invite code
        const { data: vibes } = await getVibes({
          inviteCodeId,
        });

        await updateVibe({
          vibeId: vibes[0].id,
          receiverId: userId,
        });
      }
    } catch (vibeError) {
      // Log error but don't fail the signup process
      console.error("Error linking vibes:", vibeError);
    }

    try {
      await createFriend({
        currentUserId: userId,
        targetUserId: signupData.inviterId,
      });
    } catch (friendError) {
      // Log error but don't fail the signup process
      console.error("Error creating friend:", friendError);
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
