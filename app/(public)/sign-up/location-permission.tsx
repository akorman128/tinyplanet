import { useState, useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import * as Location from "expo-location";

import { Button, Heading, Body } from "@/design-system";
import { useSignupStore } from "@/stores/signupStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LocationPermissionPage() {
  const { setSignupData } = useSignupStore();
  const [locationDenied, setLocationDenied] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Request location permissions and get location on mount
  useEffect(() => {
    (async () => {
      try {
        // Check if permissions are already granted
        const { status: existingStatus } =
          await Location.getForegroundPermissionsAsync();

        let finalStatus = existingStatus;

        // If not granted, request permissions
        if (existingStatus !== "granted") {
          const { status } = await Location.requestForegroundPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          setLocationDenied(true);
          setIsLoadingLocation(false);
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        // Store location in signup store
        setSignupData({
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });

        // Navigate to next screen
        router.push("/sign-up/user-details");
      } catch (error) {
        console.error("Error getting location:", error);
        setLocationDenied(true);
        setIsLoadingLocation(false);
      }
    })();
  }, [setSignupData]);

  const handleRetryLocation = async () => {
    setIsLoadingLocation(true);
    setLocationDenied(false);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationDenied(true);
        setIsLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setSignupData({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      // Navigate to next screen
      router.push("/sign-up/user-details");
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationDenied(true);
      setIsLoadingLocation(false);
    }
  };

  // Show loading screen while checking/requesting location permissions
  if (isLoadingLocation) {
    return (
      <KeyboardAwareScrollView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
        <View className="flex-1 items-center justify-center px-6">
          <Heading className="text-center">Getting your location...</Heading>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  // Show error screen if location permissions denied
  if (locationDenied) {
    return (
      <KeyboardAwareScrollView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
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
      </KeyboardAwareScrollView>
    );
  }

  return null;
}
