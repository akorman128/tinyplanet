import { Profile } from "../types/profile";
import { useProfileStore } from "../stores/profileStore";
import { useSupabase } from "./useSupabase";

export const useProfile = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState, setProfileState } = useProfileStore();

  // ––– QUERIES –––

  interface getProfileDto {
    userId: string;
    withVibe?: boolean;
  }

  interface getProfileOutputDto {
    data: Profile;
  }

  const getProfile = async (
    input: getProfileDto
  ): Promise<getProfileOutputDto> => {
    const { userId } = input;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return { data };
  };

  interface updateProfileDto {
    updateData: Partial<Profile>;
  }

  interface updateProfileOutputDto {
    data: Partial<Profile>;
  }

  const updateProfile = async (
    input: updateProfileDto
  ): Promise<updateProfileOutputDto> => {
    const { updateData } = input;

    if (!profileState) {
      throw new Error("Profile not loaded");
    }

    //`POINT(${longitude} ${latitude})`;

    const updatedProfile = {
      ...profileState,
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    setProfileState(updatedProfile);

    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfile)
      .eq("id", profileState!.id)
      .select()
      .single();

    if (error) throw error;

    return { data };
  };

  return {
    isLoaded,
    getProfile,
    updateProfile,
  };
};
