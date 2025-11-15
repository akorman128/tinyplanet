import { router } from "expo-router";

import { LocationPermissionScreen } from "@/components/LocationPermissionScreen";
import { useSignupStore } from "@/stores/signupStore";

export default function LocationPermissionPage() {
  const { setSignupData } = useSignupStore();

  return (
    <LocationPermissionScreen
      context="signup"
      onSuccess={(coords) => {
        // Store location in signup store
        setSignupData({
          location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        });

        // Navigate to next screen
        router.push("/sign-up/user-details");
      }}
    />
  );
}
