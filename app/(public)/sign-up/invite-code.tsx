import { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { router } from "expo-router";

import { Button, Heading, Subheading, Input } from "@/design-system";
import { useSignupStore } from "@/stores/signupStore";

export default function InviteCodePage() {
  const { signupData, setSignupData } = useSignupStore();
  const [inviteCode, setInviteCode] = useState(signupData.inviteCode);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!inviteCode.trim()) {
      setError("Invite code is required");
      return;
    }

    // Save to store
    setSignupData({ inviteCode: inviteCode.trim() });

    // Navigate to next screen
    router.push("/sign-up/user-details");
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md gap-6">
          <View className="gap-2">
            <Heading className="text-center">What&apos;s the password?</Heading>
            <Subheading className="text-center">
              Enter your invite code to get started
            </Subheading>
          </View>

          <View className="gap-4">
            <Input
              label="Invite Code"
              value={inviteCode}
              onChangeText={(text) => {
                setInviteCode(text);
                setError("");
              }}
              placeholder="Enter your invite code"
              autoCapitalize="characters"
              error={error}
            />

            <Button
              variant="primary"
              onPress={handleContinue}
              disabled={!inviteCode.trim()}
            >
              Continue
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
