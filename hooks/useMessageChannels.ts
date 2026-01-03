import { useCallback } from "react";
import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";
import {
  MessageChannel,
  GetMessageChannelsInput,
  GetMessageChannelsOutput,
  MarkChannelAsReadInput,
} from "@/types/messageChannel";

export const useMessageChannels = () => {
  const { supabase, isLoaded } = useSupabase();
  const profile = useRequireProfile();

  const getMessageChannels = useCallback(
    async (input: GetMessageChannelsInput): Promise<GetMessageChannelsOutput> => {
      const { limit = 20, offset = 0 } = input;

      // Call RPC function (returns channels with unread counts)
      const { data, error } = await supabase
        .rpc("get_message_channels", { p_user_id: profile.id })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return { data: (data as MessageChannel[]) ?? [] };
    },
    [supabase, profile.id]
  );

  const markChannelAsRead = useCallback(
    async (input: MarkChannelAsReadInput): Promise<void> => {
      const { friendId } = input;

      // Upsert to conversation_reads table
      const { error } = await supabase
        .from("conversation_reads")
        .upsert(
          {
            user_id: profile.id,
            friend_id: friendId,
            last_read_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,friend_id",
          }
        );

      if (error) throw error;
    },
    [supabase, profile.id]
  );

  const subscribeToAllMessages = useCallback(
    (onMessage: (friendId: string, message: any) => void) => {
      const userId = profile.id;

      const channel = supabase
        .channel("all-messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `user_id_a=eq.${userId}`,
          },
          (payload) => {
            const message = payload.new;
            const friendId =
              message.sender_id === userId ? message.user_id_b : message.sender_id;
            onMessage(friendId, message);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `user_id_b=eq.${userId}`,
          },
          (payload) => {
            const message = payload.new;
            const friendId =
              message.sender_id === userId ? message.user_id_a : message.sender_id;
            onMessage(friendId, message);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },
    [supabase, profile.id]
  );

  return {
    isLoaded,
    getMessageChannels,
    markChannelAsRead,
    subscribeToAllMessages,
  };
};
