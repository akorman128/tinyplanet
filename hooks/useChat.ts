import { useCallback } from "react";
import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";
import {
  Message,
  MessageWithSender,
  GetMessagesInput,
  GetMessagesOutput,
  SendMessageInput,
  SendMessageOutput,
  UpdateMessageInput,
  UpdateMessageOutput,
  DeleteMessageInput,
  SendTypingIndicatorInput,
  TypingIndicatorEvent,
} from "@/types/chat";

export const useChat = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  // ––––– HELPERS –––––

  const orderUserIds = (userId1: string, userId2: string): [string, string] => {
    return userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];
  };

  // Generate consistent channel name for a conversation
  const getChannelName = (friendId: string): string => {
    const [user_a, user_b] = orderUserIds(profile.id, friendId);
    return `chat:${user_a}:${user_b}`;
  };

  // ––– QUERIES –––

  const getMessages = async (
    input: GetMessagesInput
  ): Promise<GetMessagesOutput> => {
    const { friendId, limit = 10, offset = 0 } = input;
    const [user_a, user_b] = orderUserIds(profile.id, friendId);

    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        *,
        sender:profiles!messages_sender_id_fkey(id, full_name, avatar_url)
      `
      )
      .eq("user_id_a", user_a)
      .eq("user_id_b", user_b)
      .is("deleted_at", null) // Only fetch non-deleted messages
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Reverse for chronological order (oldest first)
    const messagesWithSender = (data as unknown as MessageWithSender[]) || [];
    return { data: messagesWithSender.reverse() };
  };

  // ––– MUTATIONS –––

  const sendMessage = async (
    input: SendMessageInput
  ): Promise<SendMessageOutput> => {
    const { friendId, text } = input;
    const [user_a, user_b] = orderUserIds(profile.id, friendId);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        user_id_a: user_a,
        user_id_b: user_b,
        sender_id: profile.id,
        text: text.trim(),
      })
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const updateMessage = async (
    input: UpdateMessageInput
  ): Promise<UpdateMessageOutput> => {
    const { messageId, text } = input;

    const { data, error } = await supabase
      .from("messages")
      .update({
        text: text.trim(),
        edited_at: new Date().toISOString(),
      })
      .eq("id", messageId)
      .eq("sender_id", profile.id) // Only sender can edit
      .is("deleted_at", null) // Can't edit deleted messages
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const deleteMessage = async (input: DeleteMessageInput): Promise<void> => {
    const { messageId } = input;

    // Soft delete: set deleted_at timestamp
    const { error } = await supabase
      .from("messages")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", messageId)
      .eq("sender_id", profile.id) // Only sender can delete
      .is("deleted_at", null); // Can't delete already deleted messages

    if (error) throw error;
  };

  // ––– REALTIME SUBSCRIPTIONS –––

  // Subscribe to new messages in a conversation
  const subscribeToMessages = useCallback(
    (friendId: string, onMessage: (message: Message) => void): (() => void) => {
      if (!isLoaded) {
        return () => {};
      }

      const [user_a, user_b] = orderUserIds(profile.id, friendId);
      const channelName = getChannelName(friendId);

      const channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `user_id_a=eq.${user_a},user_id_b=eq.${user_b}`,
          },
          (payload) => {
            onMessage(payload.new as Message);
          }
        )
        .subscribe();

      // Return unsubscribe function for cleanup
      return () => {
        supabase.removeChannel(channel);
      };
    },
    [isLoaded, supabase, profile.id]
  );

  // Subscribe to message updates (edits/deletes)
  const subscribeToMessageUpdates = useCallback(
    (friendId: string, onUpdate: (message: Message) => void): (() => void) => {
      if (!isLoaded) {
        return () => {};
      }

      const [user_a, user_b] = orderUserIds(profile.id, friendId);
      const channelName = `${getChannelName(friendId)}_updates`;

      const channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "messages",
            filter: `user_id_a=eq.${user_a},user_id_b=eq.${user_b}`,
          },
          (payload) => {
            onUpdate(payload.new as Message);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
    [isLoaded, supabase, profile.id]
  );

  // ––– TYPING INDICATORS (Realtime Broadcast) –––

  const sendTypingIndicator = useCallback(
    async (input: SendTypingIndicatorInput): Promise<void> => {
      if (!isLoaded) return;

      const { friendId } = input;
      const channelName = `${getChannelName(friendId)}_presence`;

      // Broadcast typing event (no database storage)
      const channel = supabase.channel(channelName);
      await channel.send({
        type: "broadcast",
        event: "typing",
        payload: {
          userId: profile.id,
          isTyping: true,
        },
      });
    },
    [isLoaded, supabase, profile.id]
  );

  const subscribeToTypingIndicators = useCallback(
    (
      friendId: string,
      onTyping: (event: TypingIndicatorEvent) => void
    ): (() => void) => {
      if (!isLoaded) {
        return () => {};
      }

      const channelName = `${getChannelName(friendId)}_presence`;

      const channel = supabase
        .channel(channelName)
        .on("broadcast", { event: "typing" }, (payload) => {
          onTyping(payload.payload as TypingIndicatorEvent);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
    [isLoaded, supabase, profile.id]
  );

  return {
    isLoaded,
    getMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
    subscribeToMessages,
    subscribeToMessageUpdates,
    sendTypingIndicator,
    subscribeToTypingIndicators,
  };
};
