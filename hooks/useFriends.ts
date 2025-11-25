import { useProfileStore } from "@/stores/profileStore";
import { useSupabase } from "./useSupabase";
import {
  GetFriendIdsInput,
  GetFriendsOutput,
  GetFriendsOfFriendsOutput,
  GetMutualsInput,
  GetMutualsOutput,
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
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  SearchFriendsAndMutualsInput,
  SearchFriendsAndMutualsOutput,
  FriendWithRelationship,
  GetPendingRequestsOutput,
  PendingRequest,
} from "@/types/friendship";

export const useFriends = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState } = useProfileStore();

  //––––– HELPERS –––––

  const orderUserIds = (userId1: string, userId2: string): [string, string] => {
    return userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];
  };

  /**
   * Validates a friend request to ensure it's not self-friending
   */
  const validateFriendRequest = (
    currentUserId: string,
    targetUserId: string
  ): void => {
    if (currentUserId === targetUserId) {
      throw new Error("Cannot send friend request to yourself");
    }
  };

  // ––– QUERIES –––

  const getFriendIds = async (input: GetFriendIdsInput): Promise<string[]> => {
    const { targetUserId } = input;
    const { data, error } = await supabase
      .from("friendships")
      .select("user_a, user_b")
      .eq("status", FriendshipStatus.ACCEPTED)
      .or(`user_a.eq.${targetUserId},user_b.eq.${targetUserId}`);

    if (error) throw error;

    return (
      data?.map((f) => (f.user_a === targetUserId ? f.user_b : f.user_a)) ?? []
    );
  };

  const getFriends = async (): Promise<GetFriendsOutput> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot fetch friends");
    }

    const userId = profileState.id;

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
      .eq("status", FriendshipStatus.ACCEPTED);

    if (error) throw error;

    const friends = ((data as unknown as FriendshipWithProfiles[]) ?? [])
      .map((row) => (row.user_a === userId ? row.b : row.a))
      .filter((friend): friend is Friend => friend !== null);

    return { data: friends };
  };

  const getFriendsOfFriends = async (): Promise<GetFriendsOfFriendsOutput> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot fetch friends of friends");
    }

    const userId = profileState.id;

    const { data, error } = await supabase
      .from("friends_of_friends_profiles_v")
      .select("id, full_name, avatar_url, website, location")
      .eq("user_id", userId);

    if (error) throw error;

    return { data: (data as Friend[]) ?? [] };
  };

  const getMutuals = async (
    input: GetMutualsInput
  ): Promise<GetMutualsOutput> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot fetch mutuals");
    }

    // Get my friend IDs and target's friend IDs in parallel
    const [myFriendIds, targetFriendIds] = await Promise.all([
      getFriendIds({ targetUserId: profileState.id }),
      getFriendIds({ targetUserId: input.targetUserId }),
    ]);

    const mutuals = myFriendIds.filter((id) => targetFriendIds.includes(id));
    return { data: mutuals };
  };

  /**
   * Gets all friend and mutual locations as a single GeoJSON FeatureCollection
   * for displaying on a map. Friends and mutuals are marked with different types.
   * Mutuals include connecting_friend_id to enable connection line visualization.
   */
  const getFriendLocations = async (): Promise<GeoJSONFeatureCollection> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot fetch friend locations");
    }

    const userId = profileState.id;

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

  /**
   * Searches friends and friends-of-friends by name
   */
  const searchFriendsAndMutuals = async (
    input: SearchFriendsAndMutualsInput
  ): Promise<SearchFriendsAndMutualsOutput> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot search friends");
    }

    const { query } = input;
    const userId = profileState.id;

    // Get friends and friends-of-friends in parallel
    const [{ data: friends }, { data: mutuals }] = await Promise.all([
      getFriends(),
      getFriendsOfFriends(),
    ]);

    // Filter by name (case-insensitive)
    const lowerQuery = query.toLowerCase().trim();

    const matchingFriends: FriendWithRelationship[] = friends
      .filter((f) => f.full_name.toLowerCase().includes(lowerQuery))
      .map((f) => ({ ...f, relationship: "friend" as const }));

    const matchingMutuals: FriendWithRelationship[] = mutuals
      .filter((m) => m.full_name.toLowerCase().includes(lowerQuery))
      .map((m) => ({ ...m, relationship: "mutual" as const }));

    // Combine and sort by name
    const results = [...matchingFriends, ...matchingMutuals].sort((a, b) =>
      a.full_name.localeCompare(b.full_name)
    );

    return { data: results };
  };

  /**
   * Gets all pending friend requests (incoming and outgoing)
   */
  const getPendingRequests =
    async (): Promise<GetPendingRequestsOutput> => {
      if (!profileState) {
        throw new Error("Profile not loaded - cannot fetch pending requests");
      }

      const userId = profileState.id;

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
    if (!profileState) {
      throw new Error("Profile not loaded - cannot send friend request");
    }

    const { targetUserId } = input;
    const userId = profileState.id;

    validateFriendRequest(userId, targetUserId);

    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    const { data, error } = await supabase
      .from("friendships")
      .upsert({
        user_a,
        user_b,
        requested_by: userId,
        status: FriendshipStatus.PENDING,
        accepted_at: null,
      })
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const acceptFriendRequest = async (
    input: AcceptFriendRequestInput
  ): Promise<AcceptFriendRequestOutput> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot accept friend request");
    }

    const { fromUserId } = input;
    const userId = profileState.id;
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
      .neq("requested_by", userId)
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const declineFriendRequest = async (
    input: DeclineFriendRequestInput
  ): Promise<void> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot decline friend request");
    }

    const userId = profileState.id;
    const { targetUserId } = input;
    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    const { error } = await supabase
      .from("friendships")
      .update({ status: FriendshipStatus.DECLINED, accepted_at: null })
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", FriendshipStatus.PENDING);

    if (error) throw error;
  };

  const unfriend = async (input: UnfriendInput): Promise<void> => {
    if (!profileState) {
      throw new Error("Profile not loaded - cannot unfriend");
    }

    const userId = profileState.id;
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

  return {
    isLoaded,
    getFriends,
    getFriendsOfFriends,
    getMutuals,
    getFriendLocations,
    searchFriendsAndMutuals,
    getPendingRequests,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
    createFriend,
  };
};
