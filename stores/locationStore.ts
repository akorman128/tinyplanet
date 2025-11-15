import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
}

export const useLocationStore = create<LocationPermissionState>()(
  persist(
    (set) => ({
      hasBeenGranted: false,
      lastPermissionStatus: null,
      permissionRequired: false,
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
    }),
    {
      name: "location-permission-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
