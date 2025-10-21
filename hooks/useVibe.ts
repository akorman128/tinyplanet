import { Vibe } from "../types/vibe";
import { useSupabase } from "./useSupabase";
import { useProfileStore } from "../stores/profileStore";

export const useVibe = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState } = useProfileStore();

  // ––– QUERIES –––

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
    const { data, error } = await supabase
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
    createOrUpdateVibe,
    deleteVibe,
  };
};
