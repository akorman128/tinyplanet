import {
  Vibe,
  GetVibesDto,
  GetVibesOutputDto,
  VibeWithSender,
  GetVibesWithSenderOutputDto,
} from "../types/vibe";
import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";

export const useVibe = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  // ––– QUERIES –––

  const getVibes = async (
    input: GetVibesDto = {}
  ): Promise<GetVibesOutputDto> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    const { recipientId, giverId, inviteCodeId } = input;

    let query = supabase.from("vibes").select("*");

    // Apply optional filters
    if (recipientId) {
      query = query.eq("receiver_id", recipientId);
    }
    if (giverId) {
      query = query.eq("giver_id", giverId);
    }
    if (inviteCodeId) {
      query = query.eq("invite_code_id", inviteCodeId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data };
  };

  const getVibesWithSenderInfo = async (
    recipientId: string
  ): Promise<GetVibesWithSenderOutputDto> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    const { data, error } = await supabase
      .from("vibes")
      .select("*, giver:profiles!giver_id(id, full_name, avatar_url)")
      .eq("receiver_id", recipientId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data: data as VibeWithSender[] };
  };

  interface GetTopVibesDto {
    userId: string;
    limit?: number;
  }

  interface TopVibeItem {
    emoji: string;
    count: number;
  }

  interface GetTopVibesOutputDto {
    data: TopVibeItem[];
    totalCount: number;
  }

  const getTopVibes = async (
    input: GetTopVibesDto
  ): Promise<GetTopVibesOutputDto> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    const { userId, limit = 5 } = input;

    const { data, error } = await supabase.rpc("get_top_vibes", {
      p_user_id: userId,
      p_limit: limit,
    });

    if (error) throw error;

    // Calculate total count from the returned data
    const totalCount = data?.reduce(
      (sum: number, item: TopVibeItem) => sum + item.count,
      0
    ) ?? 0;

    return { data: data ?? [], totalCount };
  };

  const hasGivenVibe = async (
    recipientId: string,
    giverId?: string
  ): Promise<boolean> => {
    if (!isLoaded) {
      throw new Error("Supabase not initialized");
    }

    const giver = giverId ?? profile.id;

    // User can't give themselves a vibe
    if (recipientId === giver) {
      return true;
    }

    const { data } = await getVibes({
      recipientId,
      giverId: giver,
    });

    return data.length > 0;
  };

  // ––– MUTATIONS –––

  interface createVibeDto {
    receiverId?: string | null;
    emojis: string[];
    inviteCodeId?: string;
  }

  interface createVibeOutputDto {
    data: Vibe;
  }

  const createVibe = async (
    input: createVibeDto
  ): Promise<createVibeOutputDto> => {
    const { receiverId, emojis, inviteCodeId } = input;

    const vibeData: {
      giver_id: string;
      receiver_id?: string;
      emojis: string[];
      invite_code_id?: string;
    } = {
      giver_id: profile.id,
      receiver_id: receiverId ?? undefined,
      emojis,
    };

    if (inviteCodeId) {
      vibeData.invite_code_id = inviteCodeId;
    }

    const { data, error } = await supabase
      .from("vibes")
      .insert(vibeData)
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  interface deleteVibeDto {
    receiverId: string;
    giverId: string;
  }

  const deleteVibe = async (input: deleteVibeDto): Promise<void> => {
    const { receiverId, giverId } = input;
    const { error } = await supabase
      .from("vibes")
      .delete()
      .eq("receiver_id", receiverId)
      .eq("giver_id", giverId)
      .select()
      .single();

    if (error) throw error;
  };

  interface updateVibeDto {
    vibeId: string;
    receiverId?: string;
    emojis?: string[];
    inviteCodeId?: string;
  }

  const updateVibe = async (input: updateVibeDto): Promise<void> => {
    const { vibeId, receiverId, emojis, inviteCodeId } = input;

    if (emojis && emojis.length !== 3) {
      throw new Error("Vibe must have exactly 3 emojis");
    }

    const updateData: {
      receiver_id?: string;
      emojis?: string[];
      invite_code_id?: string;
    } = {};

    if (receiverId !== undefined) {
      updateData.receiver_id = receiverId;
    }
    if (emojis !== undefined) {
      updateData.emojis = emojis;
    }
    if (inviteCodeId !== undefined) {
      updateData.invite_code_id = inviteCodeId;
    }

    const { error } = await supabase
      .from("vibes")
      .update(updateData)
      .eq("id", vibeId);

    if (error) throw error;
  };

  return {
    isLoaded,
    getVibes,
    getVibesWithSenderInfo,
    getTopVibes,
    hasGivenVibe,
    createVibe,
    deleteVibe,
    updateVibe,
  };
};
