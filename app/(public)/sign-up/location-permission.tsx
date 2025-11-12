import { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { router } from "expo-router";

import { Button, Heading, Body } from "@/design-system";
import { useSignupStore } from "@/stores/signupStore";
import { useLocation } from "@/hooks/useLocation";

export default function LocationPermissionPage() {
  const { setSignupData } = useSignupStore();
  const { location, isLoading, error, getCurrentLocation } = useLocation();

  // Request location permissions and get location on mount
  useEffect(() => {
    (async () => {
      const coords = await getCurrentLocation();

      if (coords) {
        // Store location in signup store
        setSignupData({
          location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        });

        // Navigate to next screen
        router.push("/sign-up/user-details");
      }
    })();
  }, [getCurrentLocation, setSignupData]);

  const handleRetryLocation = async () => {
    const coords = await getCurrentLocation();

    if (coords) {
      setSignupData({
        location: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      });

      // Navigate to next screen
      router.push("/sign-up/user-details");
    }
  };

  // Show loading screen while checking/requesting location permissions
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
        <View className="flex-1 items-center justify-center px-6">
          <Heading className="text-center">Getting your location...</Heading>
        </View>
      </SafeAreaView>
    );
  }

  // Show error screen if location permissions denied
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
        <View className="flex-1 items-center justify-center px-6 gap-4">
          <Heading className="text-center">Location Access Required</Heading>
          <Body className="text-center text-gray-600">
            Access to your location is required to use this Tiny Planet. How tf
            are we supposed to find your ass?
          </Body>
          <Button variant="primary" onPress={handleRetryLocation}>
            Retry
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}
