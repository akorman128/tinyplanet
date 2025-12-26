import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { ScreenHeader } from "@/design-system";
import { SavedPostsSection } from "@/components/SavedPostsSection";

export default function SavedPostsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-8">
        <ScreenHeader title="Saved Posts" showBackButton={true} />
        <SavedPostsSection />
      </View>
    </>
  );
}
