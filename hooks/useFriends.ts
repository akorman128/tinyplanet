import { useProfileStore } from "../stores/profileStore";
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
} from "../types/friendship";

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
  };
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export const useFriends = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState } = useProfileStore();

  //––––– HELPERS –––––

  /**
   * Orders two user IDs consistently (alphabetically) to ensure
   * the same user_a and user_b regardless of operation direction.
   * This maintains the invariant that user_a < user_b in the friendships table.
   */
  const orderUserIds = (userId1: string, userId2: string): [string, string] => {
    return userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];
  };

  /**
   * Parses PostGIS POINT format to [longitude, latitude]
   * PostGIS format: "POINT(longitude latitude)" or "(longitude,latitude)"
   */
  const parsePostGISPoint = (location: string): [number, number] | null => {
    try {
      // Handle WKT format: "POINT(longitude latitude)"
      const wktMatch = location.match(
        /POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i
      );
      if (wktMatch) {
        return [parseFloat(wktMatch[1]), parseFloat(wktMatch[2])];
      }

      // // Handle tuple format: "(longitude,latitude)"
      // const tupleMatch = location.match(/\(\s*([+-]?\d+\.?\d*)\s*,\s*([+-]?\d+\.?\d*)\s*\)/);
      // if (tupleMatch) {
      //   return [parseFloat(tupleMatch[1]), parseFloat(tupleMatch[2])];
      // }

      return null;
    } catch {
      return null;
    }
  };

  /**
   * Converts an array of Friends to GeoJSON FeatureCollection for Mapbox
   * Filters out friends without valid location data
   */
  const friendsToGeoJSON = (
    friends: Friend[],
    type: "friend" | "mutual"
  ): GeoJSONFeatureCollection => {
    const features = friends
      .filter((friend) => friend.location)
      .map((friend) => {
        const coordinates = parsePostGISPoint(friend.location!);
        if (!coordinates) return null;

        return {
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates,
          },
          properties: {
            id: friend.id,
            name: friend.full_name,
            type,
            avatar_url: friend.avatar_url,
          },
        } as GeoJSONFeature;
      })
      .filter((feature): feature is GeoJSONFeature => feature !== null);

    return {
      type: "FeatureCollection",
      features,
    };
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

  /**
   * Friendship status constants for type-safe status checks
   */
  const FRIENDSHIP_STATUS = {
    PENDING: FriendshipStatus.PENDING,
    ACCEPTED: FriendshipStatus.ACCEPTED,
    DECLINED: FriendshipStatus.DECLINED,
  } as const;

  // ––– QUERIES –––

  const getFriendIds = async (input: GetFriendIdsInput): Promise<string[]> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    const { targetUserId } = input;
    const { data, error } = await supabase
      .from("friendships")
      .select("user_a, user_b")
      .eq("status", FRIENDSHIP_STATUS.ACCEPTED)
      .or(`user_a.eq.${targetUserId},user_b.eq.${targetUserId}`);

    if (error) throw error;

    return (
      data?.map((f) => (f.user_a === targetUserId ? f.user_b : f.user_a)) ?? []
    );
  };

  const getFriends = async (): Promise<GetFriendsOutput> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
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
      .eq("status", FRIENDSHIP_STATUS.ACCEPTED);

    if (error) throw error;

    const friends = ((data as unknown as FriendshipWithProfiles[]) ?? [])
      .map((row) => (row.user_a === userId ? row.b : row.a))
      .filter((friend): friend is Friend => friend !== null);

    return { data: friends };
  };

  const getFriendsOfFriends = async (): Promise<GetFriendsOfFriendsOutput> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
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
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
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
   */
  const getFriendLocations = async (): Promise<GeoJSONFeatureCollection> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
    }

    // Fetch friends and mutuals in parallel
    const [friendsResult, mutualsResult] = await Promise.all([
      getFriends(),
      getFriendsOfFriends(),
    ]);

    // Convert to GeoJSON with type markers
    const friendFeatures = friendsToGeoJSON(friendsResult.data, "friend");
    const mutualFeatures = friendsToGeoJSON(mutualsResult.data, "mutual");

    // Combine both feature collections
    return {
      type: "FeatureCollection",
      features: [...friendFeatures.features, ...mutualFeatures.features],
    };
  };

  //––––– MUTATIONS –––––

  const sendFriendRequest = async (
    input: SendFriendRequestInput
  ): Promise<SendFriendRequestOutput> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
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
        status: FRIENDSHIP_STATUS.PENDING,
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
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
    }

    const { fromUserId } = input;
    const userId = profileState.id;
    const [user_a, user_b] = orderUserIds(userId, fromUserId);

    const { data, error } = await supabase
      .from("friendships")
      .update({
        status: FRIENDSHIP_STATUS.ACCEPTED,
        accepted_at: new Date().toISOString(),
      })
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", FRIENDSHIP_STATUS.PENDING)
      .neq("requested_by", userId)
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const declineFriendRequest = async (
    input: DeclineFriendRequestInput
  ): Promise<void> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
    }

    const userId = profileState.id;
    const { targetUserId } = input;
    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    const { error } = await supabase
      .from("friendships")
      .update({ status: FRIENDSHIP_STATUS.DECLINED, accepted_at: null })
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", FRIENDSHIP_STATUS.PENDING);

    if (error) throw error;
  };

  const unfriend = async (input: UnfriendInput): Promise<void> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    if (!profileState) {
      throw new Error("Profile not loaded");
    }

    const userId = profileState.id;
    const { targetUserId } = input;
    const [user_a, user_b] = orderUserIds(userId, targetUserId);

    const { error } = await supabase
      .from("friendships")
      .delete()
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", FRIENDSHIP_STATUS.ACCEPTED);

    if (error) throw error;
  };

  const createFriend = async (
    input: CreateFriendInput
  ): Promise<CreateFriendOutput> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    const { currentUserId, targetUserId } = input;

    validateFriendRequest(currentUserId, targetUserId);

    const [user_a, user_b] = orderUserIds(currentUserId, targetUserId);

    const { data, error } = await supabase
      .from("friendships")
      .insert({
        user_a,
        user_b,
        requested_by: targetUserId,
        status: FRIENDSHIP_STATUS.ACCEPTED,
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
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
    createFriend,
  };
};
