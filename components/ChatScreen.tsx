import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, FlatList, Alert, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ScreenHeader,
  LoadingState,
  ErrorState,
  ChatInput,
  TypingIndicator,
  colors,
} from "@/design-system";
import { MessageBubble } from "@/components";
import { useChat } from "@/hooks/useChat";
import { useProfile } from "@/hooks/useProfile";
import { useSupabase } from "@/hooks/useSupabase";
import { MessageWithSender } from "@/types/chat";

const PAGE_SIZE = 10;

export default function ChatScreen() {
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
  const { session } = useSupabase();
  const { getProfile } = useProfile();
  const {
    isLoaded,
    getMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
    subscribeToMessages,
    subscribeToMessageUpdates,
    sendTypingIndicator,
    subscribeToTypingIndicators,
  } = useChat();

  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [friendName, setFriendName] = useState("");
  const [editingMessage, setEditingMessage] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState<{
    id: string;
    full_name: string;
    avatar_url: string | null;
  } | null>(null);

  // Pagination state
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper to order user IDs consistently (same as useChat)
  const orderUserIds = (userId1: string, userId2: string): [string, string] => {
    return userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];
  };

  // Helper to determine if timestamp should be shown
  // Note: messages array is in reverse chronological order (newest first)
  const shouldShowTimestamp = (
    currentMessage: MessageWithSender,
    nextMessage: MessageWithSender | undefined
  ): boolean => {
    // Always show timestamp if it's the last message or if there's no next message
    if (!nextMessage) return true;

    // Show timestamp if next message is from a different sender
    if (currentMessage.sender_id !== nextMessage.sender_id) return true;

    // Show timestamp if time difference is more than 1 minute
    // Since array is newest-first, nextMessage is older than currentMessage
    const currentTime = new Date(currentMessage.created_at).getTime();
    const nextTime = new Date(nextMessage.created_at).getTime();
    const timeDiffInMinutes = Math.abs(currentTime - nextTime) / (1000 * 60);

    return timeDiffInMinutes >= 1;
  };

  // Fetch current user profile for optimistic updates
  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      if (!session?.user?.id) return;
      try {
        const profile = await getProfile({ userId: session.user.id });
        setCurrentUserProfile({
          id: profile.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        });
      } catch (err) {
        console.error("Failed to fetch current user profile:", err);
      }
    };
    fetchCurrentUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  // Fetch friend profile
  useEffect(() => {
    const fetchFriendProfile = async () => {
      if (!friendId) return;
      try {
        const profile = await getProfile({ userId: friendId });
        setFriendName(profile.full_name);
      } catch (err) {
        console.error("Failed to fetch friend profile:", err);
      }
    };
    fetchFriendProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId]);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      // Reset pagination state
      setOffset(0);
      setHasMore(true);

      setLoading(true);
      setError(null);
      try {
        const result = await getMessages({
          friendId,
          limit: PAGE_SIZE,
          offset: 0,
        });
        setMessages(result.data);
        setOffset(PAGE_SIZE);
        setHasMore(result.data.length === PAGE_SIZE);
      } catch (err) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId, isLoaded]);

  // Subscribe to new messages
  useEffect(() => {
    if (!friendId || !isLoaded) return;

    const unsubscribe = subscribeToMessages(friendId, (newMessage) => {
      // Fetch sender profile and append to messages
      getProfile({ userId: newMessage.sender_id }).then((profile) => {
        const messageWithSender: MessageWithSender = {
          ...newMessage,
          sender: {
            id: profile.id,
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
          },
        };

        // Only add if not already in messages (prevents duplicates from optimistic updates)
        setMessages((prev) => {
          const exists = prev.some((msg) => msg.id === newMessage.id);
          if (exists) {
            // Message already exists (from optimistic update), just return prev
            return prev;
          }
          // Prepend to maintain reverse chronological order (newest first)
          return [messageWithSender, ...prev];
        });

        // Auto-scroll to bottom (in inverted list, scrollToOffset with 0)
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }, 100);
      });
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId, isLoaded]);

  // Subscribe to message updates (edits/deletes)
  useEffect(() => {
    const unsubscribe = subscribeToMessageUpdates(
      friendId,
      (updatedMessage) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === updatedMessage.id ? { ...msg, ...updatedMessage } : msg
          )
        );
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId, isLoaded]);

  // Subscribe to typing indicators
  useEffect(() => {
    const unsubscribe = subscribeToTypingIndicators(friendId, (event) => {
      if (event.userId === friendId) {
        setIsTyping(true);

        // Clear existing timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        // Auto-hide typing indicator after 3 seconds
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    });

    return () => {
      unsubscribe();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId, isLoaded]);

  const handleLoadMore = useCallback(async () => {
    // Prevent multiple simultaneous loads
    if (loadingMore || !hasMore || loading) return;

    setLoadingMore(true);
    try {
      const result = await getMessages({
        friendId: friendId!,
        limit: PAGE_SIZE,
        offset,
      });

      // Append older messages to the end of the array (array is newest-first)
      setMessages((prev) => [...prev, ...result.data]);

      // Update pagination state
      setOffset((prev) => prev + PAGE_SIZE);
      setHasMore(result.data.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error loading more messages:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [friendId, offset, loadingMore, hasMore, loading, getMessages]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!friendId || !session?.user?.id || !currentUserProfile) return;

      try {
        if (editingMessage) {
          // Update existing message
          await updateMessage({ messageId: editingMessage.id, text });
          setEditingMessage(null);
        } else {
          // Optimistic update: add message immediately to local state
          const tempId = `temp-${Date.now()}`; // Temporary ID
          const [user_a, user_b] = orderUserIds(session.user.id, friendId);

          const optimisticMessage: MessageWithSender = {
            id: tempId,
            user_id_a: user_a,
            user_id_b: user_b,
            sender_id: session.user.id,
            text: text.trim(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            edited_at: null,
            deleted_at: null,
            sender: {
              id: currentUserProfile.id,
              full_name: currentUserProfile.full_name,
              avatar_url: currentUserProfile.avatar_url,
            },
          };

          // Add to UI immediately (prepend for reverse chronological order)
          setMessages((prev) => [optimisticMessage, ...prev]);

          // Scroll to bottom (inverted)
          setTimeout(() => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }, 100);

          // Send to database in background
          const result = await sendMessage({ friendId, text });

          // Replace temp message with real one (has real UUID from DB)
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempId
                ? { ...optimisticMessage, id: result.data.id }
                : msg
            )
          );
        }
      } catch (err) {
        Alert.alert("Error", "Failed to send message");
        // Remove optimistic message on error
        setMessages((prev) =>
          prev.filter((msg) => !msg.id.startsWith("temp-"))
        );
      }
    },
    [
      friendId,
      session?.user?.id,
      currentUserProfile,
      editingMessage,
      sendMessage,
      updateMessage,
      orderUserIds,
    ]
  );

  const handleTyping = useCallback(() => {
    if (!friendId) return;
    sendTypingIndicator({ friendId });
  }, [friendId, sendTypingIndicator]);

  const handleEditMessage = useCallback((message: MessageWithSender) => {
    setEditingMessage({ id: message.id, text: message.text });
  }, []);

  const handleDeleteMessage = useCallback(
    async (messageId: string) => {
      try {
        await deleteMessage({ messageId });
      } catch (err) {
        Alert.alert("Error", "Failed to delete message");
      }
    },
    [deleteMessage]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingMessage(null);
  }, []);

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color={colors.hex.purple600} />
      </View>
    );
  };

  if (!friendId) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <ScreenHeader title="Chat" showBackButton={true} />
          <ErrorState message="Friend ID not provided" />
        </View>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <ScreenHeader title={friendName} showBackButton={true} />
          <LoadingState />
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <ScreenHeader title={friendName} showBackButton={true} />
          <ErrorState message={error} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12">
        <ScreenHeader title={friendName} showBackButton={true} />

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MessageBubble
              message={item}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
              showTimestamp={shouldShowTimestamp(item, messages[index + 1])}
            />
          )}
          contentContainerClassName="px-4 pt-4"
          inverted
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={renderFooter}
          ListFooterComponent={
            isTyping ? <TypingIndicator friendName={friendName} /> : null
          }
        />

        <ChatInput
          onSend={handleSendMessage}
          onTyping={handleTyping}
          editingMessage={editingMessage}
          onCancelEdit={handleCancelEdit}
        />
      </View>
    </>
  );
}
