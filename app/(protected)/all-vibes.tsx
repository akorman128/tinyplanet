import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { colors, Avatar, ScreenHeader } from "@/design-system";
import { useVibe } from "@/hooks/useVibe";
import { VibeWithSender } from "@/types/vibe";
import { formatTimeAgo } from "@/utils";

export default function AllVibesScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { getVibesWithSenderInfo, isLoaded } = useVibe();
  const [vibes, setVibes] = useState<VibeWithSender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVibes = async () => {
      if (!userId || !isLoaded) return;

      try {
        setLoading(true);
        const result = await getVibesWithSenderInfo(userId);
        setVibes(result.data as VibeWithSender[]);
      } catch (err) {
        console.error("Error loading vibes:", err);
        setError("Failed to load vibes");
      } finally {
        setLoading(false);
      }
    };

    loadVibes();
  }, [userId, getVibesWithSenderInfo, isLoaded]);


  const renderVibeItem = ({ item }: { item: VibeWithSender }) => (
    <View className="flex-row px-6 py-4 items-start">
      <Avatar
        fullName={item.giver.full_name}
        avatarUrl={item.giver.avatar_url || undefined}
        size="small"
      />
      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-semibold text-purple-900">
            {item.giver.full_name}
          </Text>
          <Text className="text-xs font-medium text-gray-400">
            {formatTimeAgo(item.created_at)}
          </Text>
        </View>
        <View className="flex-row gap-2">
          {item.emojis.map((emoji, index) => (
            <Text key={index} className="text-2xl">
              {emoji}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12">
        {/* Header */}
        <ScreenHeader title="Vibes" />

        {/* Content */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.hex.purple600} />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-base text-gray-400 text-center">{error}</Text>
          </View>
        ) : vibes.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-base text-gray-400">No vibes yet</Text>
          </View>
        ) : (
          <FlatList
            data={vibes}
            renderItem={renderVibeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 16 }}
            ItemSeparatorComponent={() => (
              <View className="h-px bg-gray-100 mx-6" />
            )}
          />
        )}
      </View>
    </>
  );
}
