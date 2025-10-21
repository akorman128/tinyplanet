import { useProfileStore } from "../stores/profileStore";
import { useSupabase } from "./useSupabase";

export const useFriends = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState } = useProfileStore();

  // ––– QUERIES –––

  interface getFriendIdsDto {
    targetUserId: string;
  }

  const getFriendIds = async (input: getFriendIdsDto): Promise<string[]> => {
    const { targetUserId } = input;
    const { data, error } = await supabase
      .from("friendships")
      .select("user_a, user_b")
      .eq("status", "accepted")
      .or(`user_a.eq.${targetUserId},user_b.eq.${targetUserId}`);

    if (error) throw error;

    return (
      data?.map((f) => (f.user_a === targetUserId ? f.user_b : f.user_a)) ?? []
    );
  };

  interface getFriendsOutputDto {
    data: any;
  }

  const getFriends = async (): Promise<getFriendsOutputDto> => {
    const userId = profileState!.id;

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
      .eq("status", "accepted");

    if (error) throw error;

    const friends = (data ?? [])
      .map((row) => (row.user_a === userId ? row.b : row.a))
      .filter(Boolean);

    return { data: friends };
  };

  interface getFriendsOfFriendsOutputDto {
    data: any;
  }

  const getFriendsOfFriends =
    async (): Promise<getFriendsOfFriendsOutputDto> => {
      // Step 1: get my direct friends

      const userId = profileState?.id;

      const { data, error } = await supabase
        .from("friends_of_friends_profiles_v")
        .select("id, full_name, avatar_url, website") // any profile fields you need
        .eq("user_id", userId);

      if (error) throw error;

      return { data };
    };

  interface getMutualsDto {
    targetUserId: string;
  }

  interface getMutualsOutputDto {
    data: any;
  }

  const getMutuals = async (
    input: getMutualsDto
  ): Promise<getMutualsOutputDto> => {
    const myFriendIds = await getFriendIds({ targetUserId: profileState!.id });
    const targetFriendIds = await getFriendIds({
      targetUserId: input.targetUserId,
    });
    const mutuals = myFriendIds.filter((id) => targetFriendIds.includes(id));
    return { data: mutuals };
  };

  //––––– MUTATIONS –––––

  interface sendFriendRequestDto {
    targetUserId: string;
  }

  interface sendFriendRequestOutputDto {
    data: any;
  }

  const sendFriendRequest = async (
    input: sendFriendRequestDto
  ): Promise<sendFriendRequestOutputDto> => {
    const { targetUserId } = input;
    const userId = profileState!.id;
    const [user_a, user_b] =
      userId < targetUserId ? [userId, targetUserId] : [targetUserId, userId];

    const { data, error } = await supabase
      .from("friendships")
      .upsert({
        user_a,
        user_b,
        requested_by: userId,
        status: "pending",
        accepted_at: null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  interface acceptFriendRequestDto {
    fromUserId: string;
  }

  interface acceptFriendRequestOutputDto {
    data: any;
  }

  const acceptFriendRequest = async (
    input: acceptFriendRequestDto
  ): Promise<acceptFriendRequestOutputDto> => {
    const { fromUserId } = input;
    const userId = profileState!.id;
    const [user_a, user_b] =
      userId < fromUserId ? [userId, fromUserId] : [fromUserId, userId];

    const { data, error } = await supabase
      .from("friendships")
      .update({
        status: "accepted",
        accepted_at: new Date().toISOString(),
      })
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", "pending")
      .neq("requested_by", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  interface declineFriendRequestDto {
    targetUserId: string;
  }

  const declineFriendRequest = async (
    input: declineFriendRequestDto
  ): Promise<void> => {
    const userId = profileState!.id;
    const { targetUserId } = input;
    const [user_a, user_b] =
      userId < targetUserId ? [userId, targetUserId] : [targetUserId, userId];

    const { error } = await supabase
      .from("friendships")
      .update({ status: "declined", accepted_at: null })
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", "pending");

    if (error) throw error;
  };

  interface unfriendDto {
    targetUserId: string;
  }

  const unfriend = async (input: unfriendDto) => {
    const userId = profileState!.id;
    const { targetUserId } = input;
    const [user_a, user_b] =
      userId < targetUserId ? [userId, targetUserId] : [targetUserId, userId];

    const { error } = await supabase
      .from("friendships")
      .delete()
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .eq("status", "accepted");

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
