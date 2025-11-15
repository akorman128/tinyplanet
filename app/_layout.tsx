import { useEffect } from "react";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useSupabase } from "@/hooks/useSupabase";
import { useLocation } from "@/hooks/useLocation";
import { useLocationStore } from "@/stores/locationStore";
import { SupabaseProvider } from "../providers/supabase-provider";
import { LocationPermissionProvider } from "../providers/LocationPermissionProvider";
import { LocationPermissionScreen } from "@/components/LocationPermissionScreen";
import { initializeMapbox } from "@/utils/mapboxConfig";
import "../global.css";

// Initialize Mapbox once at app startup
initializeMapbox();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SupabaseProvider>
      <LocationPermissionProvider>
        <RootNavigator />
      </LocationPermissionProvider>
    </SupabaseProvider>
  );
}

function RootNavigator() {
  const { isLoaded, session } = useSupabase();
  const { permissionRequired } = useLocation();
  const { clearPermissionRequirement } = useLocationStore();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hide();
    }
  }, [isLoaded]);

  // Show blocking permission screen if permissions were revoked and user is logged in
  if (permissionRequired && session) {
    return (
      <LocationPermissionScreen
        context="app-resume"
        onSuccess={(coords) => {
          console.log("Location permission re-granted:", coords);
          clearPermissionRequirement();
        }}
      />
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "none",
        animationDuration: 0,
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}
