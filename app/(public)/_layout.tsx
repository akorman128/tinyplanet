import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen
        name="welcome"
        options={{
          title: "Tiny Planet",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false, // Handled by sign-up/_layout.tsx
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerTransparent: true,
          headerLargeTitle: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
