import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationPermissionState {
  /**
   * Whether user has ever granted location permission
   * (set to true during signup or first grant)
   */
  hasBeenGranted: boolean;

  /**
   * Last known permission status from the system
   */
  lastPermissionStatus: Location.PermissionStatus | null;

  /**
   * Whether permission re-grant is required
   * (set to true when we detect revocation)
   */
  permissionRequired: boolean;

  /**
   * Current cached location coordinates
   */
  currentLocation: LocationCoordinates | null;

  /**
   * Timestamp (ms) when currentLocation was last updated from device
   */
  lastUpdated: number | null;

  /**
   * Last coordinates that were written to the database
   * Used to calculate distance threshold for DB updates
   */
  lastDatabaseUpdate: LocationCoordinates | null;

  /**
   * Update the permission status
   */
  setPermissionStatus: (status: Location.PermissionStatus) => void;

  /**
   * Mark that permission has been granted
   */
  markPermissionGranted: () => void;

  /**
   * Flag that permission re-grant is required
   */
  requirePermission: () => void;

  /**
   * Clear the permission requirement flag
   */
  clearPermissionRequirement: () => void;

  /**
   * Update cached location coordinates
   */
  setLocation: (location: LocationCoordinates) => void;

  /**
   * Mark that location was updated in database
   */
  markDatabaseUpdate: (location: LocationCoordinates) => void;

  /**
   * Check if cached location is stale (older than threshold)
   * @param thresholdMs - Time threshold in milliseconds (default: 5 minutes)
   */
  isLocationStale: (thresholdMs?: number) => boolean;
}

export const useLocationStore = create<LocationPermissionState>()(
  persist(
    (set, get) => ({
      hasBeenGranted: false,
      lastPermissionStatus: null,
      permissionRequired: false,
      currentLocation: null,
      lastUpdated: null,
      lastDatabaseUpdate: null,
      setPermissionStatus: (status: Location.PermissionStatus) =>
        set({ lastPermissionStatus: status }),
      markPermissionGranted: () =>
        set({
          hasBeenGranted: true,
          lastPermissionStatus: Location.PermissionStatus.GRANTED,
          permissionRequired: false,
        }),
      requirePermission: () => set({ permissionRequired: true }),
      clearPermissionRequirement: () => set({ permissionRequired: false }),
      setLocation: (location: LocationCoordinates) =>
        set({
          currentLocation: location,
          lastUpdated: Date.now(),
        }),
      markDatabaseUpdate: (location: LocationCoordinates) =>
        set({ lastDatabaseUpdate: location }),
      isLocationStale: (thresholdMs: number = 5 * 60 * 1000) => {
        const { lastUpdated } = get();
        if (!lastUpdated) return true;
        return Date.now() - lastUpdated > thresholdMs;
      },
    }),
    {
      name: "location-permission-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
