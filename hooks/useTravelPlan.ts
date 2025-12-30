import { useCallback } from "react";
import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";
import {
  TravelPlan,
  CreateTravelPlanInput,
  CreateTravelPlanOutput,
  UpdateTravelPlanInput,
  GetActiveTravelPlanOutput,
  GetTravelPlanLocationsOutput,
  TravelPlanMapLocation,
} from "@/types/travelPlan";

export const useTravelPlan = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  // ––– QUERIES –––

  /**
   * Get the current user's active or upcoming travel plan (if any)
   * Active/Upcoming = end_date >= today (not yet finished)
   * Note: DB only allows one plan per user where end_date >= today
   */
  const getActiveTravelPlan =
    useCallback(async (): Promise<GetActiveTravelPlanOutput> => {
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("travel_plans")
        .select("*")
        .eq("user_id", profile.id)
        .gte("end_date", today)
        .maybeSingle();

      if (error) throw error;

      return { data: data as TravelPlan | null };
    }, [supabase, profile.id]);

  /**
   * Get all travel plans for current user (for history view)
   */
  const getTravelPlans = useCallback(async (): Promise<{
    data: TravelPlan[];
  }> => {
    const { data, error } = await supabase
      .from("travel_plans")
      .select("*")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data: (data as TravelPlan[]) || [] };
  }, [supabase, profile.id]);

  /**
   * Get active travel plan locations for friends/mutuals (for map display)
   */
  const getTravelPlanLocations =
    useCallback(async (): Promise<GetTravelPlanLocationsOutput> => {
      const { data, error } = await supabase.rpc(
        "get_active_travel_plan_locations",
        {
          p_user_id: profile.id,
        }
      );

      if (error) throw error;

      return { data: (data as TravelPlanMapLocation[]) || [] };
    }, [supabase, profile.id]);

  // ––– MUTATIONS –––

  /**
   * Create a new travel plan + auto-create post
   * Validates: max duration (31 days), no overlapping plan exists
   */
  const createTravelPlan = useCallback(
    async (input: CreateTravelPlanInput): Promise<CreateTravelPlanOutput> => {
      const { destination, start_date, duration_days, post_visibility } = input;

      // Client-side validation
      if (duration_days < 1 || duration_days > 31) {
        throw new Error("Duration must be between 1 and 31 days");
      }

      const startDate = new Date(start_date);
      if (isNaN(startDate.getTime())) {
        throw new Error("Invalid start date");
      }

      // Validate start date is not in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        throw new Error("Start date cannot be in the past");
      }

      // Call RPC function (atomic transaction)
      const { data, error } = await supabase.rpc(
        "create_travel_plan_with_post",
        {
          p_user_id: profile.id,
          p_destination_location_lng: destination.longitude,
          p_destination_location_lat: destination.latitude,
          p_destination_name: destination.name,
          p_start_date: start_date,
          p_duration_days: duration_days,
          p_post_visibility: post_visibility || "friends",
        }
      );

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error("Failed to create travel plan");
      }

      return data[0] as CreateTravelPlanOutput;
    },
    [supabase, profile.id]
  );

  /**
   * Update existing travel plan + update post
   */
  const updateTravelPlan = useCallback(
    async (input: UpdateTravelPlanInput): Promise<CreateTravelPlanOutput> => {
      const {
        travel_plan_id,
        destination,
        start_date,
        duration_days,
        post_visibility,
      } = input;

      // Client-side validation
      if (duration_days < 1 || duration_days > 31) {
        throw new Error("Duration must be between 1 and 31 days");
      }

      const startDate = new Date(start_date);
      if (isNaN(startDate.getTime())) {
        throw new Error("Invalid start date");
      }

      // Call RPC function (atomic transaction)
      const { data, error } = await supabase.rpc(
        "update_travel_plan_with_post",
        {
          p_travel_plan_id: travel_plan_id,
          p_destination_location_lng: destination.longitude,
          p_destination_location_lat: destination.latitude,
          p_destination_name: destination.name,
          p_start_date: start_date,
          p_duration_days: duration_days,
          p_post_visibility: post_visibility || null,
        }
      );

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error("Failed to update travel plan");
      }

      return data[0] as CreateTravelPlanOutput;
    },
    [supabase]
  );

  /**
   * Cancel travel plan + delete associated post
   */
  const cancelTravelPlan = useCallback(
    async (travelPlanId: string): Promise<void> => {
      const { error } = await supabase.rpc("cancel_travel_plan_with_post", {
        p_travel_plan_id: travelPlanId,
      });

      if (error) throw error;
    },
    [supabase]
  );

  return {
    isLoaded,
    // Queries
    getActiveTravelPlan,
    getTravelPlans,
    getTravelPlanLocations,
    // Mutations
    createTravelPlan,
    updateTravelPlan,
    cancelTravelPlan,
  };
};
