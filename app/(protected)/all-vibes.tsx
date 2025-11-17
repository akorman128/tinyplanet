import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { colors, Avatar } from "@/design-system";
import { useVibe } from "@/hooks/useVibe";
import { VibeWithSender } from "@/types/vibe";

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

  const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const vibeDate = new Date(timestamp);
    const diffMs = now.getTime() - vibeDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return vibeDate.toLocaleDateString();
  };

  const renderVibeItem = ({ item }: { item: VibeWithSender }) => (
    <View style={styles.vibeItem}>
      <Avatar
        fullName={item.giver.full_name}
        avatarUrl={item.giver.avatar_url || undefined}
        size="small"
      />
      <View style={styles.vibeContent}>
        <View style={styles.vibeHeader}>
          <Text style={styles.giverName}>{item.giver.full_name}</Text>
          <Text style={styles.timestamp}>
            {formatTimestamp(item.created_at)}
          </Text>
        </View>
        <View style={styles.emojiRow}>
          {item.emojis.map((emoji, index) => (
            <Text key={index} style={styles.emoji}>
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
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
          <Text style={styles.title}>All Vibes</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.hex.purple600} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : vibes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No vibes yet</Text>
          </View>
        ) : (
          <FlatList
            data={vibes}
            renderItem={renderVibeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.hex.white,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.hex.purple600,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.hex.purple900,
  },
  headerSpacer: {
    width: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.hex.placeholder,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.hex.placeholder,
  },
  listContent: {
    paddingVertical: 16,
  },
  vibeItem: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "flex-start",
  },
  vibeContent: {
    flex: 1,
    marginLeft: 12,
  },
  vibeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  giverName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.hex.purple900,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.hex.placeholder,
  },
  emojiRow: {
    flexDirection: "row",
    gap: 8,
  },
  emoji: {
    fontSize: 24,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 24,
  },
});
