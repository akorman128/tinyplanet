import { Stack } from "expo-router";

export default function SignUpLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerLargeTitle: true,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="invite-code"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="location-permission"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="user-details"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="phone-number"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="verify-otp"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
