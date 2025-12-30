import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
  Linking,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams, router } from "expo-router";
import { colors, Avatar, ScreenHeader } from "@/design-system";
import { useFriends } from "@/hooks/useFriends";
import { Friend } from "@/types/friendship";
import { Button } from "@/design-system";
import { useSupabase } from "@/hooks/useSupabase";

export default function MutualsScreen() {
  const { signOut } = useSupabase();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12 ">
        <ScreenHeader title="Settings" showBackButton={true} />
        <View className="w-full py-4 px-6 flex flex-col gap-2">
          <Button
            size="md"
            variant="primary"
            onPress={() => {
              Linking.openURL("https://app.youform.com/forms/werjra1a");
            }}
          >
            Feedback
          </Button>
          <Button
            size="md"
            variant="secondary"
            onPress={async () => {
              await signOut();
              router.replace("/welcome");
            }}
          >
            Sign Out
          </Button>
        </View>
      </View>
    </>
  );
}
