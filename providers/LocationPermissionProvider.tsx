import { ReactNode, useEffect } from "react";
import { AppState } from "react-native";
import { useLocation } from "@/hooks/useLocation";

interface LocationPermissionProviderProps {
  children: ReactNode;
}

/**
 * Provider that monitors app state changes and checks location permissions
 * when the app becomes active. If permissions were previously granted but
 * are now revoked, it flags the requirement for re-granting.
 */
export const LocationPermissionProvider = ({
  children,
}: LocationPermissionProviderProps) => {
  const { checkPermissionStatus } = useLocation();

  useEffect(() => {
    // Check permissions when app becomes active (user returns from settings, etc.)
    const subscription = AppState.addEventListener("change", async (state) => {
      if (state === "active") {
        await checkPermissionStatus();
      }
    });

    // Check permissions on mount
    checkPermissionStatus();

    return () => {
      subscription?.remove();
    };
  }, [checkPermissionStatus]);

  return <>{children}</>;
};
