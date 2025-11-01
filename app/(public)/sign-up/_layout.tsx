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
          title: "Invite Code",
        }}
      />
      <Stack.Screen
        name="user-details"
        options={{
          title: "About You",
        }}
      />
    </Stack>
  );
}
