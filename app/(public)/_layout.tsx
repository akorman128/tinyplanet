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
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false, // Handled by sign-up/_layout.tsx
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
