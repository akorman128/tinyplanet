import { useCallback } from "react";
import { Profile } from "../types/profile";
import { useProfileStore } from "../stores/profileStore";
import { useSupabase } from "./useSupabase";
import * as Location from "expo-location";

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

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          throw new Error(
            `Failed to fetch profile for user ${userId}: ${error.message}`
          );
        }

        return data;
      } catch (error) {
        throw new Error(
          `Error in getProfile: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    },
    [supabase]
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

      try {
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

        if (error) {
          throw new Error(`Failed to create profile: ${error.message}`);
        }

        // Update profile state with newly created profile
        setProfileState(data);

        return data;
      } catch (error) {
        throw new Error(
          `Error in createProfile: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
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

      // Store previous state for rollback
      const previousState = profileState;

      // Optimistically update local state
      const optimisticProfile = {
        ...profileState,
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      setProfileState(optimisticProfile);

      try {
        // Only send changed fields plus updated_at to the database
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
          // Rollback on error
          setProfileState(previousState);
          throw new Error(`Failed to update profile: ${error.message}`);
        }

        // Update with server response to ensure consistency
        setProfileState(data);

        return data;
      } catch (error) {
        // Rollback on error
        setProfileState(previousState);
        throw new Error(
          `Error in updateProfile: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    },
    [supabase, profileState, setProfileState]
  );

  const updateLocation = useCallback(async (): Promise<Profile | undefined> => {
    // Check if we have location permissions
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status !== "granted") {
      // Don't throw error, just silently skip location update if permission not granted
      console.error(
        "Location permission not granted, skipping location update"
      );
      return;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { longitude, latitude } = location.coords;

    return updateProfile({
      updateData: { location: `POINT(${longitude} ${latitude})` },
    });
  }, [profileState, updateProfile]);

  return {
    isLoaded,
    profileState,
    getProfile,
    createProfile,
    updateProfile,
    updateLocation,
  };
};
