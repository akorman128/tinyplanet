import React, { useState, useCallback, useEffect, useRef } from "react";
import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useSupabase } from "@/hooks/useSupabase";
import { useMessageChannels } from "@/hooks/useMessageChannels";
import { ChannelListItem } from "./ChannelListItem";
import { LoadingState, ErrorState, EmptyState } from "@/design-system";
import { MessageChannel } from "@/types/messageChannel";
import { colors } from "@/design-system/colors";

const PAGE_SIZE = 20;

export function MessagesView() {
  const { session } = useSupabase();
  const router = useRouter();
  const { getMessageChannels, markChannelAsRead, subscribeToAllMessages } =
    useMessageChannels();

  const [channels, setChannels] = useState<MessageChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const isLoadingRef = useRef(false);

  const loadChannels = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      setError(null);
      const result = await getMessageChannels({ limit: PAGE_SIZE, offset: 0 });
      setChannels(result.data);
      setOffset(PAGE_SIZE);
      setHasMore(result.data.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error loading channels:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [getMessageChannels]);

  useEffect(() => {
    loadChannels();
  }, [loadChannels]);

  // Real-time subscription
  useEffect(() => {
    if (!session?.user?.id) return;

    const unsubscribe = subscribeToAllMessages((friendId, message) => {
      setChannels((prev) => {
        const updated = prev.map((ch) =>
          ch.friend_id === friendId
            ? {
                ...ch,
                last_message_text: message.text,
                last_message_created_at: message.created_at,
                last_message_sender_id: message.sender_id,
                last_message_deleted_at: message.deleted_at,
                unread_count:
                  message.sender_id === friendId
                    ? ch.unread_count + 1
                    : ch.unread_count,
              }
            : ch
        );

        // Re-sort by timestamp
        return updated.sort(
          (a, b) =>
            new Date(b.last_message_created_at || 0).getTime() -
            new Date(a.last_message_created_at || 0).getTime()
        );
      });
    });

    return unsubscribe;
  }, [session?.user?.id, subscribeToAllMessages]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadChannels();
    setRefreshing(false);
  }, [loadChannels]);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore || refreshing) return;

    setLoadingMore(true);
    try {
      const result = await getMessageChannels({ limit: PAGE_SIZE, offset });
      setChannels((prev) => [...prev, ...result.data]);
      setOffset((prev) => prev + PAGE_SIZE);
      setHasMore(result.data.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error loading more channels:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [offset, loadingMore, hasMore, refreshing, getMessageChannels]);

  const handleChannelPress = useCallback(
    async (friendId: string) => {
      try {
        await markChannelAsRead({ friendId });
      } catch (err) {
        console.error("Error marking channel as read:", err);
        // Continue navigation even if marking as read fails
      }
      router.push(`/chat/${friendId}`);
    },
    [markChannelAsRead, router]
  );

  if (loading && !refreshing) return <LoadingState />;
  if (error && !refreshing) return <ErrorState message={error} />;
  if (channels.length === 0 && !loading)
    return <EmptyState message="No messages yet" />;

  return (
    <FlatList
      data={channels}
      renderItem={({ item }) => (
        <ChannelListItem
          channel={item}
          currentUserId={session!.user!.id}
          onPress={handleChannelPress}
        />
      )}
      keyExtractor={(item) => item.friend_id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.hex.purple600}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator color={colors.hex.purple600} /> : null
      }
      contentContainerClassName="pt-36 pb-20"
    />
  );
}
