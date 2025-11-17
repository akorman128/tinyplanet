import {
  Vibe,
  GetVibesDto,
  GetVibesOutputDto,
  VibeWithSender,
  GetVibesWithSenderOutputDto,
} from "../types/vibe";
import { useSupabase } from "./useSupabase";
import { useProfileStore } from "../stores/profileStore";

export const useVibe = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState } = useProfileStore();

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

    const vibeData: any = {
      giver_id: profileState!.id,
      receiver_id: receiverId,
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

    const updateData: any = {};

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
    createVibe,
    deleteVibe,
    updateVibe,
  };
};
