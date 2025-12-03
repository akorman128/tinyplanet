export enum FriendshipStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export enum FriendshipDisplayStatus {
  NOT_FRIENDS = "not_friends",
  FRIENDS = "friends",
  PENDING_SENT = "pending_sent",
  PENDING_RECEIVED = "pending_received",
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
  location?: string; // PostGIS POINT as WKT string
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

export interface CreateFriendInput {
  currentUserId: string;
  targetUserId: string;
}

export interface CreateFriendOutput {
  data: Friendship;
}

export interface SearchFriendsInput {
  query: string;
}

export interface SearchFriendsOutput {
  data: Friend[];
}

export interface PendingRequest extends Friend {
  direction: "incoming" | "outgoing";
  created_at: string;
}

export interface GetPendingRequestsOutput {
  incoming: PendingRequest[];
  outgoing: PendingRequest[];
}

// GeoJSON types for Mapbox
export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    id: string;
    name: string;
    type: "friend" | "mutual";
    avatar_url?: string;
    connecting_friend_id?: string; // For mutuals: the friend that connects them
  };
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Connection line types for network visualization
export type ConnectionType = "user-to-friend" | "friend-to-mutual";

export interface ConnectionLine {
  from: {
    id: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  to: {
    id: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  type: ConnectionType;
}

export interface ConnectionData {
  userToFriendLines: ConnectionLine[];
  friendToMutualLines: ConnectionLine[];
}
