import { Profile } from "./profile";

export enum FriendshipStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export interface Friendship {
  id: string;
  user_a: string;
  user_b: string;
  status: FriendshipStatus;
  requested_by: string;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Friend {
  id: string;
  full_name: string;
  avatar_url: string;
  website: string;
  hometown: string;
  birthday: string;
}

export interface FriendshipWithProfiles extends Friendship {
  a: Friend | null;
  b: Friend | null;
}

// Input/Output types for useFriends hook

export interface GetFriendIdsInput {
  targetUserId: string;
}

export interface GetFriendsOutput {
  data: Friend[];
}

export interface GetFriendsOfFriendsOutput {
  data: Friend[];
}

export interface GetMutualsInput {
  targetUserId: string;
}

export interface GetMutualsOutput {
  data: string[];
}

export interface SendFriendRequestInput {
  targetUserId: string;
}

export interface SendFriendRequestOutput {
  data: Friendship;
}

export interface AcceptFriendRequestInput {
  fromUserId: string;
}

export interface AcceptFriendRequestOutput {
  data: Friendship;
}

export interface DeclineFriendRequestInput {
  targetUserId: string;
}

export interface UnfriendInput {
  targetUserId: string;
}
