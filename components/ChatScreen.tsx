import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, FlatList, Alert } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ScreenHeader,
  LoadingState,
  ErrorState,
  MessageBubble,
  ChatInput,
  TypingIndicator,
} from "@/design-system";
import { useChat } from "@/hooks/useChat";
import { useProfile } from "@/hooks/useProfile";
import { MessageWithSender } from "@/types/chat";

export default function ChatScreen() {
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
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

  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, [friendId, getProfile]);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      if (!friendId || !isLoaded) return;

      setLoading(true);
      setError(null);
      try {
        const result = await getMessages({ friendId });
        setMessages(result.data);
      } catch (err) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [friendId, isLoaded, getMessages]);

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
        setMessages((prev) => [...prev, messageWithSender]);
        // Auto-scroll to bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      });
    });

    return unsubscribe;
  }, [friendId, isLoaded, subscribeToMessages, getProfile]);

  // Subscribe to message updates (edits/deletes)
  useEffect(() => {
    if (!friendId || !isLoaded) return;

    const unsubscribe = subscribeToMessageUpdates(friendId, (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === updatedMessage.id
            ? { ...msg, ...updatedMessage }
            : msg
        )
      );
    });

    return unsubscribe;
  }, [friendId, isLoaded, subscribeToMessageUpdates]);

  // Subscribe to typing indicators
  useEffect(() => {
    if (!friendId || !isLoaded) return;

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
  }, [friendId, isLoaded, subscribeToTypingIndicators]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!friendId) return;

      try {
        if (editingMessage) {
          // Update existing message
          await updateMessage({ messageId: editingMessage.id, text });
          setEditingMessage(null);
        } else {
          // Send new message
          await sendMessage({ friendId, text });
        }
      } catch (err) {
        Alert.alert("Error", "Failed to send message");
      }
    },
    [friendId, editingMessage, sendMessage, updateMessage]
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
          <ScreenHeader title={friendName || "Chat"} showBackButton={true} />
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
          <ScreenHeader title={friendName || "Chat"} showBackButton={true} />
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
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
            />
          )}
          contentContainerClassName="px-4 pt-4"
          ListFooterComponent={
            isTyping ? <TypingIndicator friendName={friendName} /> : null
          }
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
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
