import { Vibe, GetVibesDto, GetVibesOutputDto } from "../types/vibe";
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

    return { data: (data as Vibe[]) ?? [] };
  };

  // ––– MUTATIONS –––

  interface createVibeDto {
    receiverId: string;
    emojis: string[];
  }

  interface createVibeOutputDto {
    data: Vibe;
  }

  const createOrUpdateVibe = async (
    input: createVibeDto
  ): Promise<createVibeOutputDto> => {
    const { receiverId, emojis } = input;

    if (emojis.length !== 3) {
      throw new Error("Vibe must have exactly 3 emojis");
    }

    const { data, error } = await supabase
      .from("vibes")
      .upsert(
        { giver_id: profileState!.id, receiver_id: receiverId, emojis },
        {
          onConflict: "giver_id,receiver_id",
          ignoreDuplicates: false,
        }
      )
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

  return {
    isLoaded,
    getVibes,
    createOrUpdateVibe,
    deleteVibe,
  };
};
