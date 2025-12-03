import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { colors, Avatar, ScreenHeader } from "@/design-system";
import { useFriends } from "@/hooks/useFriends";
import { Friend } from "@/types/friendship";

export default function MutualsScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { getMutualsBetweenUsers } = useFriends();
  const [mutuals, setMutuals] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMutuals = async () => {
      if (!userId) {
        setError("No user specified");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const mutualFriends = await getMutualsBetweenUsers(userId);
        setMutuals(mutualFriends);
      } catch (err) {
        console.error("Error fetching mutuals:", err);
        setError("Failed to load mutual friends");
      } finally {
        setLoading(false);
      }
    };

    fetchMutuals();
  }, [userId]);

  const handleUserPress = (friendId: string) => {
    router.push({ pathname: "/profile", params: { userId: friendId } });
  };

  const renderMutualItem = ({ item }: { item: Friend }) => (
    <Pressable
      onPress={() => handleUserPress(item.id)}
      className="flex-row items-center py-4 px-6 border-b border-gray-100 active:bg-gray-50"
    >
      <Avatar
        fullName={item.full_name}
        avatarUrl={item.avatar_url}
        size="small"
      />
      <View className="ml-3 flex-1">
        <Text className="text-base font-medium text-gray-900">
          {item.full_name}
        </Text>
        {item.hometown && (
          <Text className="text-sm text-gray-500 mt-0.5">{item.hometown}</Text>
        )}
      </View>
    </Pressable>
  );

  // Loading state
  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <ScreenHeader title="Mutual Friends" showBackButton={true} />
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.hex.purple600} />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12">
        <ScreenHeader title="Mutual Friends" showBackButton={true} />

        {mutuals.length === 0 ? (
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-base text-gray-400 text-center">
              No mutual friends
            </Text>
          </View>
        ) : (
          <View className="flex-1">
            <View className="py-3 px-6 border-b border-gray-100">
              <Text className="text-sm text-gray-500">
                {mutuals.length} {mutuals.length === 1 ? "mutual" : "mutuals"}
              </Text>
            </View>
            <FlatList
              data={mutuals}
              keyExtractor={(item) => item.id}
              renderItem={renderMutualItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </>
  );
}
