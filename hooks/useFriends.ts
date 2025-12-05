import { useRequireProfile } from "./useRequireProfile";
import { useSupabase } from "./useSupabase";
import {
  GetFriendIdsInput,
  GetFriendsOutput,
  GetFriendsOfFriendsOutput,
  SendFriendRequestInput,
  SendFriendRequestOutput,
  AcceptFriendRequestInput,
  AcceptFriendRequestOutput,
  DeclineFriendRequestInput,
  UnfriendInput,
  CreateFriendInput,
  CreateFriendOutput,
  FriendshipWithProfiles,
  Friend,
  FriendshipStatus,
  FriendshipDisplayStatus,
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  SearchFriendsInput,
  SearchFriendsOutput,
  GetPendingRequestsOutput,
  PendingRequest,
} from "@/types/friendship";

export const useFriends = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  //––––– HELPERS –––––

  const orderUserIds = (userId1: string, userId2: string): [string, string] => {
    return userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];
  };

  const validateFriendRequest = (
    currentUserId: string,
    targetUserId: string
  ): void => {
    if (currentUserId === targetUserId) {
      throw new Error("Cannot send friend request to yourself");
    }
  };

  // ––– QUERIES –––

  const getFriends = async (userId?: string): Promise<GetFriendsOutput> => {
    const id = userId ?? profile.id;

    const { data, error } = await supabase
      .from("friendships")
      .select(
        `
      id,
      user_a,
      user_b,
      status,
      a:profiles!friendships_user_a_fkey (id, full_name, avatar_url, website, hometown, birthday, location),
      b:profiles!friendships_user_b_fkey (id, full_name, avatar_url, website, hometown, birthday, location)
        `
      )
      .or(`user_a.eq.${id},user_b.eq.${id}`)
      .eq("status", FriendshipStatus.ACCEPTED);

    if (error) throw error;

    const friends = ((data as unknown as FriendshipWithProfiles[]) ?? [])
      .map((row) => (row.user_a === id ? row.b : row.a))
      .filter((friend): friend is Friend => friend !== null);

    return { data: friends };
  };

  const getFriendsOfFriends = async (): Promise<GetFriendsOfFriendsOutput> => {
    const userId = profile.id;

    const { data, error } = await supabase
      .from("friends_of_friends_profiles_v")
      .select("id, full_name, avatar_url, website, location")
      .eq("user_id", userId);

    if (error) throw error;

    return { data: (data as Friend[]) ?? [] };
  };

  const getFriendLocations = async (): Promise<GeoJSONFeatureCollection> => {
    const userId = profile.id;

    // Call RPC functions to get friend and mutual locations with coordinates
    const [
      { data: friends, error: friendsError },
      { data: mutuals, error: mutualsError },
    ] = await Promise.all([
      supabase.rpc("get_friend_locations", { p_user_id: userId }),
      supabase.rpc("get_mutual_locations_with_connections", {
        p_user_id: userId,
      }),
    ]);

    if (friendsError) throw friendsError;
    if (mutualsError) throw mutualsError;

    // Convert to GeoJSON format
    const allLocations = [...(friends || []), ...(mutuals || [])];
    const features: GeoJSONFeature[] = allLocations.map((loc) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [loc.longitude, loc.latitude],
      },
      properties: {
        id: loc.id,
        name: loc.full_name,
        type: loc.type as "friend" | "mutual",
        avatar_url: loc.avatar_url,
        connecting_friend_id: loc.connecting_friend_id, // Only present for mutuals
      },
    }));

    return {
      type: "FeatureCollection",
      features,
    };
  };

  const searchFriends = async (
    input: SearchFriendsInput
  ): Promise<SearchFriendsOutput> => {
    const { query } = input;
    const trimmedQuery = query.trim();

    // Return empty results for empty query
    if (!trimmedQuery) {
      return { data: [] };
    }

    const userId = profile.id;

    // Use database-level filtering with ilike for case-insensitive search
    const { data, error } = await supabase
      .from("friendships")
      .select(
        `
      id,
      user_a,
      user_b,
      status,
      a:profiles!friendships_user_a_fkey (id, full_name, avatar_url, website, hometown, birthday, location),
      b:profiles!friendships_user_b_fkey (id, full_name, avatar_url, website, hometown, birthday, location)
        `
      )
      .or(`user_a.eq.${userId},user_b.eq.${userId}`)
      .eq("status", FriendshipStatus.ACCEPTED)
      .or(
        `a.full_name.ilike.%${trimmedQuery}%,b.full_name.ilike.%${trimmedQuery}%`
      );

    if (error) throw error;

    const friends = ((data as unknown as FriendshipWithProfiles[]) ?? [])
      .map((row) => (row.user_a === userId ? row.b : row.a))
      .filter((friend): friend is Friend => friend !== null)
      // Filter again client-side to ensure only matching friends are returned
      // (since OR query might return rows where only one profile matches)
      .filter((friend) =>
        friend.full_name.toLowerCase().includes(trimmedQuery.toLowerCase())
      )
      // Sort by name
      .sort((a, b) => a.full_name.localeCompare(b.full_name));

    return { data: friends };
  };

  const getFriendshipStatus = async (
    targetUserId: string
  ): Promise<{
    status: FriendshipDisplayStatus;
  }> => {
    const userId = profile.id;
    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    const { data: friendship, error } = await supabase
      .from("friendships")
      .select("status, requested_by")
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .maybeSingle();

    if (error) throw error;

    if (!friendship) {
      return { status: FriendshipDisplayStatus.NOT_FRIENDS };
    }

    if (friendship.status === FriendshipStatus.ACCEPTED) {
      return { status: FriendshipDisplayStatus.FRIENDS };
    }

    if (friendship.status === FriendshipStatus.PENDING) {
      return {
        status:
          friendship.requested_by === userId
            ? FriendshipDisplayStatus.PENDING_SENT
            : FriendshipDisplayStatus.PENDING_RECEIVED,
      };
    }

    return { status: FriendshipDisplayStatus.NOT_FRIENDS };
  };

  const getPendingRequests = async (): Promise<GetPendingRequestsOutput> => {
    const userId = profile.id;

    // Get all pending friendships involving this user
    const { data, error } = await supabase
      .from("friendships")
      .select(
        `
        id,
        user_a,
        user_b,
        status,
        requested_by,
        created_at,
        a:profiles!friendships_user_a_fkey (id, full_name, avatar_url, website, hometown, birthday, location),
        b:profiles!friendships_user_b_fkey (id, full_name, avatar_url, website, hometown, birthday, location)
      `
      )
      .or(`user_a.eq.${userId},user_b.eq.${userId}`)
      .eq("status", FriendshipStatus.PENDING);

    if (error) throw error;

    const friendships = (data as unknown as FriendshipWithProfiles[]) ?? [];

    const incoming: PendingRequest[] = [];
    const outgoing: PendingRequest[] = [];

    friendships.forEach((f) => {
      const isIncoming = f.requested_by !== userId;
      const otherUser = f.user_a === userId ? f.b : f.a;

      if (!otherUser) return;

      const request: PendingRequest = {
        ...otherUser,
        direction: isIncoming ? "incoming" : "outgoing",
        created_at: f.created_at,
      };

      if (isIncoming) {
        incoming.push(request);
      } else {
        outgoing.push(request);
      }
    });

    return { incoming, outgoing };
  };

  //––––– MUTATIONS –––––

  const sendFriendRequest = async (
    input: SendFriendRequestInput
  ): Promise<SendFriendRequestOutput> => {
    const { targetUserId } = input;
    const userId = profile.id;

    validateFriendRequest(userId, targetUserId);

    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    // First try to insert a new friendship
    const { data: insertData, error: insertError } = await supabase
      .from("friendships")
      .insert({
        user_a,
        user_b,
        requested_by: userId,
        status: FriendshipStatus.PENDING,
        accepted_at: null,
      })
      .select()
      .single();

    // If insert succeeds, return the data
    if (!insertError) {
      return { data: insertData };
    }

    // If we got a duplicate key error (23505), the friendship already exists
    // This could be in any status (pending, accepted, declined)
    if (insertError.code === "23505") {
      // Try updating with both possible orderings to handle any data inconsistency
      const { data: updateData, error: updateError } = await supabase
        .from("friendships")
        .update({
          requested_by: userId,
          status: FriendshipStatus.PENDING,
          accepted_at: null,
        })
        .or(
          `and(user_a.eq.${user_a},user_b.eq.${user_b}),and(user_a.eq.${user_b},user_b.eq.${user_a})`
        )
        .select()
        .maybeSingle();

      if (updateError) {
        throw new Error(
          "A friendship record already exists but cannot be updated. This user may have already sent you a friend request."
        );
      }

      // If no rows were updated, the record exists but RLS won't let us see/update it
      if (!updateData) {
        throw new Error(
          "A friendship request already exists between you and this user. The other user may have already sent you a request - try refreshing the page."
        );
      }

      return { data: updateData };
    }

    // If it's a different error, throw it
    throw insertError;
  };

  const acceptFriendRequest = async (
    input: AcceptFriendRequestInput
  ): Promise<AcceptFriendRequestOutput> => {
    const { fromUserId } = input;
    const userId = profile.id;
    const [user_a, user_b] = orderUserIds(userId, fromUserId);

    const { data, error } = await supabase
      .from("friendships")
      .update({
        status: FriendshipStatus.ACCEPTED,
        accepted_at: new Date().toISOString(),
      })
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", FriendshipStatus.PENDING)
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const declineFriendRequest = async (
    input: DeclineFriendRequestInput
  ): Promise<void> => {
    const userId = profile.id;
    const { targetUserId } = input;
    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    const { error } = await supabase
      .from("friendships")
      .update({ status: FriendshipStatus.DECLINED })
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", FriendshipStatus.PENDING);

    if (error) throw error;
  };

  const unfriend = async (input: UnfriendInput): Promise<void> => {
    const userId = profile.id;
    const { targetUserId } = input;
    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    const { error } = await supabase
      .from("friendships")
      .delete()
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", FriendshipStatus.ACCEPTED);

    if (error) throw error;
  };

  const createFriend = async (
    input: CreateFriendInput
  ): Promise<CreateFriendOutput> => {
    const { currentUserId, targetUserId } = input;

    validateFriendRequest(currentUserId, targetUserId);

    const [user_a, user_b] = orderUserIds(currentUserId, targetUserId);

    const { data, error } = await supabase
      .from("friendships")
      .insert({
        user_a,
        user_b,
        requested_by: targetUserId,
        status: FriendshipStatus.ACCEPTED,
        accepted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const getMutualsBetweenUsers = async (
    targetUserId: string
  ): Promise<Friend[]> => {
    const { data, error } = await supabase.rpc(
      "get_mutual_friends_between_users",
      {
        p_user_id: profile.id,
        p_target_user_id: targetUserId,
      }
    );

    if (error) throw error;

    return (data as Friend[]) ?? [];
  };

  return {
    isLoaded,
    getFriends,
    getFriendsOfFriends,
    getFriendLocations,
    searchFriends,
    getPendingRequests,
    getFriendshipStatus,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
    createFriend,
    getMutualsBetweenUsers,
  };
};
