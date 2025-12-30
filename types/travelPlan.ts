import { PostVisibility } from "./post";

export interface TravelPlan {
  id: string;
  user_id: string;
  destination_location: string; // PostGIS POINT format: "POINT(lng lat)"
  destination_name: string;
  start_date: string; // ISO date string
  duration_days: number;
  end_date: string; // ISO date string
  post_id: string | null;
  created_at: string;
  updated_at: string;
}

// Extended type with extracted coordinates
export interface TravelPlanWithCoordinates extends TravelPlan {
  longitude: number;
  latitude: number;
}

// For map display
export interface TravelPlanMapLocation {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string;
  destination_name: string;
  start_date: string;
  end_date: string;
  longitude: number;
  latitude: number;
  type: "own" | "friend" | "mutual";
}

// Input DTOs
export interface CreateTravelPlanInput {
  destination: {
    longitude: number;
    latitude: number;
    name: string; // Human-readable name
  };
  start_date: string; // ISO date string (YYYY-MM-DD)
  duration_days: number; // 1-31
  post_visibility?: PostVisibility; // defaults to 'friends'
}

export interface UpdateTravelPlanInput {
  travel_plan_id: string;
  destination: {
    longitude: number;
    latitude: number;
    name: string;
  };
  start_date: string;
  duration_days: number;
  post_visibility?: PostVisibility;
}

// Output DTOs
export interface CreateTravelPlanOutput {
  travel_plan_id: string;
  post_id: string;
  destination_name: string;
  start_date: string;
  end_date: string;
}

export interface GetActiveTravelPlanOutput {
  data: TravelPlan | null;
}

export interface GetTravelPlanLocationsOutput {
  data: TravelPlanMapLocation[];
}
