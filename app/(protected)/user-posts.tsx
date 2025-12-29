import React from "react";
import { View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScreenHeader } from "@/design-system";
import { UserPostsSection } from "@/components/UserPostsSection";
import { useRequireProfile } from "@/hooks/useRequireProfile";

export default function UserPostsScreen() {
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const currentUserProfile = useRequireProfile();

  // Use provided userId or default to current user's ID
  const displayUserId = userId || currentUserProfile.id;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-8">
        <ScreenHeader title="Posts" showBackButton={true} />
        <UserPostsSection
          userId={displayUserId}
          onOpenComments={(postId, commentCount) => {
            // Could navigate to comments screen here if implemented
            console.log("Open comments for post:", postId);
          }}
        />
      </View>
    </>
  );
}
