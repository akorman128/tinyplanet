export type Vibe = {
  id: string;
  created_at: string;
  updated_at: string;
  giver_id: string;
  receiver_id: string;
  emojis: string[]; // exactly 3
  invite_code_id?: string; // optional reference to invite code
};

export interface CreateVibeDto {
  receiverId: string;
  emojis: string[];
  inviteCodeId?: string;
}

export interface CreateVibeOutputDto {
  data: Vibe;
}

export interface DeleteVibeDto {
  receiverId: string;
  giverId: string;
}

export interface GetVibesReceivedDto {
  receiverId: string;
}

export interface GetVibesGivenDto {
  giverId: string;
}

export interface GetVibeDto {
  giverId: string;
  receiverId: string;
}

export interface GetVibesOutputDto {
  data: Vibe[];
}

export interface GetVibeOutputDto {
  data: Vibe | null;
}

export interface GetVibesDto {
  recipientId?: string;
  giverId?: string;
  inviteCodeId?: string;
  includeSenderInfo?: boolean;
}

export interface VibeWithSender extends Vibe {
  giver: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
}

export interface GetVibesWithSenderOutputDto {
  data: VibeWithSender[];
}
