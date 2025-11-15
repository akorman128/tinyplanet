import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Heading, Body } from "@/design-system";
import { useLocation } from "@/hooks/useLocation";

type LocationPermissionContext = "signup" | "app-resume";

interface LocationPermissionScreenProps {
  /**
   * Context determines the messaging and behavior
   * - "signup": Used during initial signup flow
   * - "app-resume": Used when permissions are revoked after signup
   */
  context: LocationPermissionContext;

  /**
   * Called when location is successfully obtained
   * For signup: Should navigate to next step
   * For app-resume: Should clear permission requirement flag
   */
  onSuccess: (coords: { latitude: number; longitude: number }) => void;

  /**
   * Optional: Called when user retries after error
   */
  onRetry?: () => void;
}

export function LocationPermissionScreen({
  context,
  onSuccess,
  onRetry,
}: LocationPermissionScreenProps) {
  const { isLoading, error, getCurrentLocation } = useLocation();

  // Request location permissions on mount
  useEffect(() => {
    (async () => {
      try {
        const coords = await getCurrentLocation();
        if (coords) {
          onSuccess(coords);
        }
      } catch (err) {
        // Error will be captured in the error state
        console.error("Error getting location:", err);
      }
    })();
  }, [getCurrentLocation, onSuccess]);

  const handleRetry = async () => {
    onRetry?.();
    try {
      const coords = await getCurrentLocation();
      if (coords) {
        onSuccess(coords);
      }
    } catch (err) {
      console.error("Error retrying location:", err);
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
    const isSignup = context === "signup";
    const title = isSignup
      ? "Location Access Required"
      : "Location Permission Revoked";
    const message = isSignup
      ? "Access to your location is required to use this Tiny Planet. How tf are we supposed to find your ass?"
      : "Location access was revoked. Please re-enable location permissions to continue using Tiny Planet.";

    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
        <View className="flex-1 items-center justify-center px-6 gap-4">
          <Heading className="text-center">{title}</Heading>
          <Body className="text-center text-gray-600">{message}</Body>
          <Button variant="primary" onPress={handleRetry}>
            {isSignup ? "Retry" : "Grant Permission"}
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}
