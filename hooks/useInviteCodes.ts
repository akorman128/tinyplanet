import { useProfileStore } from "../stores/profileStore";
import { useSupabase } from "./useSupabase";
import { InviteCode, InviteCodeStatus } from "../types/invite_code";
import { generateInviteCode } from "../utils/inviteCode";

export const useInviteCodes = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState } = useProfileStore();

  // ––– QUERIES –––

  interface getInviteCodesDto {
    filters: {
      userId?: string;
      code?: string;
      startDate?: Date;
      endDate?: Date;
      status?: InviteCodeStatus;
    };
  }

  interface getInviteCodesOutputDto {
    data: InviteCode[];
  }

  const getInviteCodes = async (
    input: getInviteCodesDto
  ): Promise<getInviteCodesOutputDto> => {
    const { filters } = input;

    let query = supabase
      .from("invite_codes")
      .select("*")
      .eq("status", filters?.status ?? InviteCodeStatus.ACTIVE)
      .order("created_at", { ascending: false });

    if (filters?.code) {
      query = query.eq("code", filters.code);
    }
    if (filters?.userId) {
      query = query.eq("inviter_id", filters.userId);
    }

    if (filters?.startDate) {
      query = query.gte("created_at", filters.startDate.toISOString());
    }
    if (filters?.endDate) {
      query = query.lte("created_at", filters.endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    return { data };
  };

  interface createInviteCodeDto {
    code?: string; // Optional - will be generated if not provided
    expires_at: Date;
  }

  interface createInviteCodeOutputDto {
    data: InviteCode;
    code: string; // The generated or provided code
  }

  const createInviteCode = async (
    input: createInviteCodeDto
  ): Promise<createInviteCodeOutputDto> => {
    const { code: providedCode, expires_at } = input;

    if (!profileState?.id) {
      throw new Error("User must be authenticated to create invite codes");
    }

    // If code is provided, use it directly (no retry)
    if (providedCode) {
      const { data, error } = await supabase
        .from("invite_codes")
        .insert({
          code: providedCode,
          inviter_id: profileState.id,
          status: "active",
          expires_at,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error("Code already exists, please try again");
        }
        throw error;
      }

      return { data, code: providedCode };
    }

    // Generate code with retry logic
    const maxRetries = 5;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const generatedCode = generateInviteCode();

      const { data, error } = await supabase
        .from("invite_codes")
        .insert({
          code: generatedCode,
          inviter_id: profileState.id,
          status: "active",
          expires_at,
        })
        .select()
        .single();

      // Success - return the data and code
      if (!error) {
        return { data, code: generatedCode };
      }

      // If it's a duplicate code error and we haven't exhausted retries, try again
      if (error.code === "23505" && attempt < maxRetries - 1) {
        continue;
      }

      // Otherwise throw the error
      if (error.code === "23505") {
        throw new Error(
          "Failed to generate unique invite code after multiple attempts"
        );
      }
      throw error;
    }

    throw new Error("Failed to create invite code");
  };

  // ––– SEND INVITE CODE VIA SMS –––

  interface sendInviteCodeDto {
    phone_number: string;
    invite_code: string;
    inviter_name?: string;
  }

  interface sendInviteCodeOutputDto {
    success: boolean;
    message: string;
    messageSid?: string;
  }

  const sendInviteCode = async (
    input: sendInviteCodeDto
  ): Promise<sendInviteCodeOutputDto> => {
    const { phone_number, invite_code, inviter_name } = input;

    if (!profileState?.id) {
      throw new Error("User must be authenticated to send invite codes");
    }

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke("send-invite-sms", {
      body: {
        phone_number,
        invite_code,
        inviter_name: inviter_name || profileState.full_name,
      },
    });

    if (error) {
      throw new Error(`Failed to send invite: ${error.message}`);
    }

    if (!data.success) {
      throw new Error(data.error || "Failed to send invite");
    }

    return {
      success: true,
      message: data.message || "Invite sent successfully",
      messageSid: data.messageSid,
    };
  };

  // ––– MUTATIONS –––

  interface updateInviteCodeDto {
    inviteCodeId: string;
    status: InviteCodeStatus;
    redeemed_at?: string;
  }

  interface updateInviteCodeOutputDto {
    data: InviteCode;
  }

  const updateInviteCode = async (
    input: updateInviteCodeDto
  ): Promise<updateInviteCodeOutputDto> => {
    const { inviteCodeId, status, redeemed_at } = input;

    const updateData: {
      status: InviteCodeStatus;
      redeemed_at?: string;
    } = { status };

    if (redeemed_at) {
      updateData.redeemed_at = redeemed_at;
    }

    const { data, error } = await supabase
      .from("invite_codes")
      .update(updateData)
      .eq("id", inviteCodeId)
      .eq("status", "active")
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Code not found or already used");

    return { data };
  };

  interface redeemInviteCodeDto {
    code: string;
  }

  const redeemInviteCode = async (
    input: redeemInviteCodeDto
  ): Promise<boolean> => {
    const { code } = input;

    const { data } = await getInviteCodes({
      filters: { code: code, status: InviteCodeStatus.ACTIVE },
    });

    if (!data || data.length === 0) {
      throw new Error("Code not found or already used");
    }

    const inviteCode = data[0];

    if (inviteCode.expires_at && new Date(inviteCode.expires_at) < new Date()) {
      await updateInviteCode({
        inviteCodeId: inviteCode.id,
        status: InviteCodeStatus.EXPIRED,
      });

      throw new Error("Code has expired");
    }

    await updateInviteCode({
      inviteCodeId: inviteCode.id,
      status: InviteCodeStatus.REDEEMED,
      redeemed_at: new Date().toISOString(),
    });

    return true;
  };

  return {
    isLoaded,
    getInviteCodes,
    createInviteCode,
    sendInviteCode,
    updateInviteCode,
    redeemInviteCode,
  };
};
