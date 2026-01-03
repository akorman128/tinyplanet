export interface MessageChannel {
  friend_id: string;
  full_name: string;
  avatar_url: string | null;
  last_message_id: string | null;
  last_message_text: string | null;
  last_message_sender_id: string | null;
  last_message_created_at: string | null;
  last_message_deleted_at: string | null;
  unread_count: number;
}

export interface GetMessageChannelsInput {
  limit?: number;
  offset?: number;
}

export interface GetMessageChannelsOutput {
  data: MessageChannel[];
}

export interface MarkChannelAsReadInput {
  friendId: string;
}
