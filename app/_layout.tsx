import { useEffect, useRef } from "react";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View, ActivityIndicator, Text } from "react-native";

import { useSupabase } from "@/hooks/useSupabase";
import { useLocationStore } from "@/stores/locationStore";
import { useProfile } from "@/hooks/useProfile";
import { useProfileStore } from "@/stores/profileStore";
import { SupabaseProvider } from "../providers/supabase-provider";
import { LocationPermissionProvider } from "../providers/LocationPermissionProvider";
import { LocationPermissionScreen } from "@/components/LocationPermissionScreen";
import { initializeMapbox } from "@/utils/mapboxConfig";
import { Button } from "@/design-system/Button";
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
  const { isLoaded, session, signOut } = useSupabase();
  const { permissionRequired, clearPermissionRequirement } = useLocationStore();
  const { getProfile } = useProfile();
  const {
    profileState,
    isLoading,
    error,
    setProfileState,
    setLoading,
    setError,
    setProfileError,
  } = useProfileStore();
  const loadProfileRef = useRef<(() => void) | undefined>(undefined);

  // Load profile when session exists but profile doesn't
  useEffect(() => {
    const loadProfile = async () => {
      // Skip if no session, profile already loaded, or currently loading
      if (!session?.user?.id || profileState || isLoading) {
        return;
      }

      console.log("Session exists but no profile - fetching from database");
      setLoading(true);

      try {
        const profile = await getProfile({ userId: session.user.id });
        setProfileState(profile);
        console.log("Profile loaded successfully:", profile.id);
      } catch (error) {
        const profileError =
          error instanceof Error ? error : new Error("Failed to load profile");
        setProfileError(profileError);
        console.error("Failed to load profile:", profileError);
      }
    };

    loadProfileRef.current = loadProfile;
    loadProfile();
  }, [
    session?.user?.id,
    profileState,
    isLoading,
    getProfile,
    setProfileState,
    setLoading,
    setProfileError,
  ]);

  // Hide splash screen when auth is loaded and either:
  // - No session (show public routes)
  // - Profile is loaded (show protected routes)
  useEffect(() => {
    if (isLoaded && (!session || (profileState && !isLoading))) {
      SplashScreen.hide();
    }
  }, [isLoaded, session, profileState, isLoading]);

  // Show loading while profile is being fetched
  if (session && !profileState && isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  // Show error state with retry option
  if (session && error && !profileState) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-lg text-purple-900 font-semibold mb-2">
          Failed to Load Profile
        </Text>
        <Text className="text-base text-gray-500 mb-6 text-center">
          {error.message}
        </Text>
        <Button
          onPress={() => {
            setError(null);
            loadProfileRef.current?.();
          }}
        >
          Retry
        </Button>
        <Button variant="secondary" onPress={signOut} className="mt-3">
          Sign Out
        </Button>
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

