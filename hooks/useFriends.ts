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
  FriendshipWithProfiles,
  Friend,
  FriendshipStatus,
} from "../types/friendship";

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
      a:profiles!friendships_user_a_fkey (id, full_name, avatar_url, website, hometown, birthday),
      b:profiles!friendships_user_b_fkey (id, full_name, avatar_url, website, hometown, birthday)
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
      .select("id, full_name, avatar_url, website")
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

  return {
    isLoaded,
    getFriends,
    getFriendsOfFriends,
    getMutuals,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
  };
};
