import { Profile } from "./profile";

// ============ DATA MODELS ============

// Base message interface
export interface Message {
  id: string;
  user_id_a: string;
  user_id_b: string;
  sender_id: string;
  text: string;
  edited_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

// Message with sender profile information
export interface MessageWithSender extends Message {
  sender: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
}

// ============ INPUT DTOS ============

export interface GetMessagesInput {
  friendId: string;
  limit?: number;
  offset?: number;
}

export interface SendMessageInput {
  friendId: string;
  text: string;
}

export interface UpdateMessageInput {
  messageId: string;
  text: string;
}

export interface DeleteMessageInput {
  messageId: string;
}

export interface SendTypingIndicatorInput {
  friendId: string;
}

// ============ OUTPUT DTOS ============

export interface GetMessagesOutput {
  data: MessageWithSender[];
}

export interface SendMessageOutput {
  data: Message;
}

export interface UpdateMessageOutput {
  data: Message;
}

// ============ REALTIME EVENTS ============

// Typing indicator event
export interface TypingIndicatorEvent {
  userId: string;
  isTyping: boolean;
}
