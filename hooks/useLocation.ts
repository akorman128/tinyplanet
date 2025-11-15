import { useState, useCallback } from "react";
import * as Location from "expo-location";
import { useSupabase } from "./useSupabase";
import { useProfileStore } from "../stores/profileStore";

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface UseLocationReturn {
  location: LocationCoordinates | null;
  permissionStatus: Location.PermissionStatus | null;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<LocationCoordinates | null>;
  refreshLocation: () => Promise<void>;
  updateLocationInDatabase: () => Promise<void>;
  checkPermissionStatus: () => Promise<void>;
}

/**
 * Hook for managing location permissions and fetching current location
 * Centralizes all location-related functionality
 */
export const useLocation = (): UseLocationReturn => {
  const { supabase } = useSupabase();
  const { profileState, setProfileState } = useProfileStore();
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Request location permission from the user
   * Returns true if granted, false otherwise
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Check existing permission status
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();
      setPermissionStatus(existingStatus);

      if (existingStatus === Location.PermissionStatus.GRANTED) {
        return true;
      }

      // Request permission if not granted
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== Location.PermissionStatus.GRANTED) {
        setError("Location permission not granted");
        return false;
      }

      return true;
    } catch (err) {
      console.error("Error requesting location permission:", err);
      setError("Failed to request location permission");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get current location coordinates
   * Automatically requests permission if not already granted
   */
  const getCurrentLocation =
    useCallback(async (): Promise<LocationCoordinates> => {
      try {
        setIsLoading(true);
        setError(null);

        // Check and request permission if needed
        const hasPermission = await requestPermission();
        if (!hasPermission) {
          return { latitude: 0, longitude: 0 };
        }

        // Get current position
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const coords: LocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(coords);
        return coords;
      } catch (err) {
        console.error("Error getting current location:", err);
        setError("Failed to get current location");
        return { latitude: 0, longitude: 0 };
      } finally {
        setIsLoading(false);
      }
    }, [requestPermission]);

  /**
   * Refresh the current location
   * Useful for pull-to-refresh or periodic updates
   */
  const refreshLocation = useCallback(async (): Promise<void> => {
    await getCurrentLocation();
  }, [getCurrentLocation]);

  /**
   * Check the current permission status without requesting permission
   * Useful for monitoring permission changes when app becomes active
   */
  const checkPermissionStatus = useCallback(async (): Promise<void> => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);
    } catch (err) {
      console.error("Error checking permission status:", err);
    }
  }, []);

  /**
   * Update the user's location in the database
   * Requests permission if not already granted, then updates the profile location
   */
  const updateLocationInDatabase = useCallback(async (): Promise<void> => {
    if (!profileState) {
      console.error("No profile loaded, skipping location update");
      return;
    }

    try {
      // Get current location (handles permissions internally)
      const coords = await getCurrentLocation();

      // Check if location was successfully retrieved
      if (coords.latitude === 0 && coords.longitude === 0) {
        console.error(
          "Location permission not granted, skipping location update"
        );
        return;
      }

      const { longitude, latitude } = coords;

      // Update location in database
      const { data, error } = await supabase
        .from("profiles")
        .update({
          location: `POINT(${longitude} ${latitude})`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profileState.id)
        .select()
        .single();

      if (error) {
        console.error("Failed to update location in database:", error.message);
        return;
      }

      // Update profile state with new location
      if (data) {
        setProfileState(data);
      }
    } catch (err) {
      console.error("Error updating location in database:", err);
    }
  }, [profileState, supabase, setProfileState, getCurrentLocation]);

  return {
    location,
    permissionStatus,
    isLoading,
    error,
    requestPermission,
    getCurrentLocation,
    refreshLocation,
    updateLocationInDatabase,
    checkPermissionStatus,
  };
};
