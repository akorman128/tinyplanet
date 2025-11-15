import { ReactNode, useEffect } from "react";
import { AppState } from "react-native";
import { useLocation } from "@/hooks/useLocation";
import { useLocationStore } from "@/stores/locationStore";

interface LocationPermissionProviderProps {
  children: ReactNode;
}

/**
 * Provider that monitors app state changes and refreshes location
 * when the app becomes active. Implements smart refresh logic:
 * - Checks permission status
 * - Refreshes location if stale (>5 minutes old)
 * - Updates database if moved >100m (handled by useLocation hook)
 */
export const LocationPermissionProvider = ({
  children,
}: LocationPermissionProviderProps) => {
  const { checkPermissionStatus, getCurrentLocation, updateLocationInDatabase } =
    useLocation();
  const locationStore = useLocationStore();

  useEffect(() => {
    // Monitor app state changes
    const subscription = AppState.addEventListener("change", async (state) => {
      if (state === "active") {
        // Always check permission status
        await checkPermissionStatus();

        // Refresh location if stale (>5 minutes old)
        if (locationStore.isLocationStale()) {
          console.log("App became active - refreshing stale location");

          // Get fresh location (will be cached)
          await getCurrentLocation(true);

          // Conditionally update database (distance threshold applied internally)
          await updateLocationInDatabase();
        }
      }
    });

    // On initial mount, check permissions
    checkPermissionStatus();

    return () => {
      subscription?.remove();
    };
  }, [
    checkPermissionStatus,
    getCurrentLocation,
    updateLocationInDatabase,
    locationStore,
  ]);

  return <>{children}</>;
};
