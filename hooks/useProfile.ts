import { useCallback } from "react";
import { Profile } from "@/types/profile";
import { useProfileStore } from "@/stores/profileStore";
import { useSupabase } from "./useSupabase";

export const useProfile = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState, setProfileState } = useProfileStore();

  // ––– QUERIES –––

  interface GetProfileDto {
    userId: string;
  }

  const getProfile = useCallback(
    async (input: GetProfileDto): Promise<Profile> => {
      const { userId } = input;

      const { data, error } = await supabase.rpc("get_profile", {
        p_user_id: userId,
        p_current_user_id: profileState?.id || null,
      });

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error(`Profile not found for user ${userId}`);
      }

      return data[0];
    },
    [supabase, profileState?.id]
  );

  // ––– MUTATIONS –––

  interface CreateProfileDto {
    id: string;
    phone_number: string;
    full_name: string;
    hometown: string;
    birthday: string;
    location?: {
      latitude: number;
      longitude: number;
    };
    invited_by?: string;
  }

  const createProfile = useCallback(
    async (input: CreateProfileDto): Promise<Profile> => {
      const {
        id,
        phone_number,
        full_name,
        hometown,
        birthday,
        location,
        invited_by,
      } = input;

      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id,
          phone_number,
          full_name,
          avatar_url: "",
          website: "",
          hometown,
          birthday,
          location: location
            ? `POINT(${location.longitude} ${location.latitude})`
            : "",
          invited_by,
        })
        .select()
        .single();

      if (error) throw error;

      setProfileState(data);

      return data;
    },
    [supabase, setProfileState]
  );

  interface UpdateProfileDto {
    updateData: Partial<Profile>;
  }

  const updateProfile = useCallback(
    async (input: UpdateProfileDto): Promise<Profile> => {
      const { updateData } = input;

      if (!profileState) {
        throw new Error("Profile not loaded. Cannot update profile.");
      }

      const previousState = profileState;

      const optimisticProfile = {
        ...profileState,
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      setProfileState(optimisticProfile);

      try {
        const updatePayload = {
          ...updateData,
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from("profiles")
          .update(updatePayload)
          .eq("id", profileState.id)
          .select()
          .single();

        if (error) {
          setProfileState(previousState);
          throw error;
        }

        setProfileState(data);

        return data;
      } catch (error) {
        setProfileState(previousState);
        throw error;
      }
    },
    [supabase, profileState, setProfileState]
  );

  return {
    isLoaded,
    profileState,
    getProfile,
    createProfile,
    updateProfile,
  };
};
