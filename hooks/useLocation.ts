import { useState, useCallback } from "react";
import * as Location from "expo-location";
import { useSupabase } from "./useSupabase";
import { useProfileStore } from "@/stores/profileStore";
import { useLocationStore, LocationCoordinates } from "@/stores/locationStore";
import { Profile } from "@/types/profile";

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 - First coordinate
 * @param coord2 - Second coordinate
 * @returns Distance in meters
 */
const calculateDistance = (
  coord1: LocationCoordinates,
  coord2: LocationCoordinates
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export interface UseLocationReturn {
  location: LocationCoordinates | null;
  permissionStatus: Location.PermissionStatus | null;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: (forceRefresh?: boolean) => Promise<LocationCoordinates>;
  refreshLocation: () => Promise<void>;
  updateLocationInDatabase: (
    forceUpdate?: boolean,
    profile?: Profile
  ) => Promise<void>;
  checkPermissionStatus: () => Promise<void>;
}

/**
 * Hook for managing location permissions and fetching current location
 * Centralizes all location-related functionality with smart caching
 */
export const useLocation = (): UseLocationReturn => {
  const { supabase } = useSupabase();
  const { profileState, setProfileState } = useProfileStore();

  // Use selective subscriptions to prevent unnecessary re-renders
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const lastPermissionStatus = useLocationStore(
    (state) => state.lastPermissionStatus
  );
  const lastDatabaseUpdate = useLocationStore(
    (state) => state.lastDatabaseUpdate
  );
  const setPermissionStatus = useLocationStore(
    (state) => state.setPermissionStatus
  );
  const markPermissionGranted = useLocationStore(
    (state) => state.markPermissionGranted
  );
  const setLocation = useLocationStore((state) => state.setLocation);
  const isLocationStale = useLocationStore((state) => state.isLocationStale);
  const markDatabaseUpdate = useLocationStore(
    (state) => state.markDatabaseUpdate
  );

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

      markPermissionGranted();
      return true;
    } catch (err) {
      console.error("Error requesting location permission:", err);
      setError("Failed to request location permission");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setPermissionStatus, markPermissionGranted]);

  /**
   * @param forceRefresh - If true, always fetch fresh location from device
   */
  const getCurrentLocation = useCallback(
    async (forceRefresh: boolean = false): Promise<LocationCoordinates> => {
      try {
        setIsLoading(true);
        setError(null);

        // Return cached location if available and not stale (unless forcing refresh)
        if (!forceRefresh && currentLocation && !isLocationStale()) {
          return currentLocation;
        }

        // Check and request permission if needed
        const hasPermission = await requestPermission();
        if (!hasPermission) {
          return { latitude: 0, longitude: 0 };
        }

        // Get current position from device
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const coords: LocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Update cache
        setLocation(coords);
        return coords;
      } catch (err) {
        console.error("Error getting current location:", err);
        setError("Failed to get current location");
        return { latitude: 0, longitude: 0 };
      } finally {
        setIsLoading(false);
      }
    },
    [requestPermission, currentLocation, isLocationStale, setLocation]
  );

  /**
   * Refresh the current location
   * Useful for pull-to-refresh or periodic updates
   * Always forces a fresh location fetch
   */
  const refreshLocation = useCallback(async (): Promise<void> => {
    await getCurrentLocation(true);
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
  }, [setPermissionStatus]);

  /**
   * Update the user's location in the database
   * Requests permission if not already granted, then updates the profile location
   * Implements distance-based filtering to avoid unnecessary DB writes
   * @param forceUpdate - If true, skip distance check and always update database
   * @param profile - Optional profile to use instead of reading from store (useful to avoid race conditions)
   */
  const updateLocationInDatabase = useCallback(
    async (forceUpdate: boolean = false, profile?: Profile): Promise<void> => {
      // Use provided profile or fall back to profileState from store
      const currentProfile = profile || profileState;

      if (!currentProfile) {
        console.error("No profile loaded, skipping location update");
        return;
      }

      try {
        // Get current location (handles permissions and caching internally)
        const coords = await getCurrentLocation();

        // Check if location was successfully retrieved
        if (coords.latitude === 0 && coords.longitude === 0) {
          console.error(
            "Location permission not granted, skipping location update"
          );
          return;
        }

        // Check distance threshold (100m) to avoid unnecessary DB writes
        if (!forceUpdate && lastDatabaseUpdate) {
          const distance = calculateDistance(coords, lastDatabaseUpdate);

          // Skip update if moved less than 100 meters
          if (distance < 100) {
            console.log(
              `Skipping DB update - only moved ${distance.toFixed(0)}m (threshold: 100m)`
            );
            return;
          }

          console.log(
            `Updating location - moved ${distance.toFixed(0)}m from last update`
          );
        }

        const { longitude, latitude } = coords;

        // Update location in database
        const { data, error } = await supabase
          .from("profiles")
          .update({
            location: `POINT(${longitude} ${latitude})`,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentProfile.id)
          .select()
          .single();

        if (error) {
          console.error(
            "Failed to update location in database:",
            error.message
          );
          return;
        }

        // Mark this location as the last database update
        markDatabaseUpdate(coords);

        // Update profile state with new location
        if (data) {
          setProfileState(data);
        }

        console.log("Location successfully updated in database");
      } catch (err) {
        console.error("Error updating location in database:", err);
      }
    },
    [
      profileState,
      supabase,
      setProfileState,
      getCurrentLocation,
      lastDatabaseUpdate,
      markDatabaseUpdate,
    ]
  );

  return {
    location: currentLocation,
    permissionStatus: lastPermissionStatus,
    isLoading,
    error,
    requestPermission,
    getCurrentLocation,
    refreshLocation,
    updateLocationInDatabase,
    checkPermissionStatus,
  };
};
