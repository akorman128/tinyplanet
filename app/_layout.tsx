import { useEffect, useState } from "react";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { useSupabase } from "@/hooks/useSupabase";
import { useLocation } from "@/hooks/useLocation";
import { useLocationStore } from "@/stores/locationStore";
import { useProfile } from "@/hooks/useProfile";
import { useProfileStore } from "@/stores/profileStore";
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
  const { getProfile } = useProfile();
  const { profileState, setProfileState } = useProfileStore();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Load profile when session exists but profile doesn't
  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user?.id || profileState || isLoadingProfile) {
        return;
      }

      console.log("Session exists but no profile - fetching from database");
      setIsLoadingProfile(true);

      try {
        const profile = await getProfile({ userId: session.user.id });
        setProfileState(profile);
        console.log("Profile loaded successfully:", profile.id);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, [session, profileState, isLoadingProfile, getProfile, setProfileState]);

  useEffect(() => {
    // Only hide splash screen when both auth and profile are loaded
    if (isLoaded && (!session || profileState || isLoadingProfile === false)) {
      SplashScreen.hide();
    }
  }, [isLoaded, session, profileState, isLoadingProfile]);

  // Show loading while profile is being fetched
  if (session && !profileState && (isLoadingProfile || !isLoaded)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

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
      <Stack.Protected guard={!!session && !!profileState}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
