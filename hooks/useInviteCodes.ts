import { useProfileStore } from "../stores/profileStore";
import { useSupabase } from "./useSupabase";
import { InviteCode, InviteCodeStatus } from "../types/invite_code";

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
    const query = supabase
      .from("invite_codes")
      .select("*")
      .eq("status", filters?.status ?? InviteCodeStatus.ACTIVE)
      .order("created_at", { ascending: false });

    if (filters?.code) {
      query.eq("code", filters.code);
    }
    if (filters?.userId) {
      query.eq("inviter_id", filters.userId);
    }

    if (filters?.startDate) {
      query.gte("created_at", filters.startDate.toISOString());
    }
    if (filters?.endDate) {
      query.lte("created_at", filters.endDate.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data };
  };

  interface createInviteCodeDto {
    inviteCode: string;
    expires_in_days: number;
  }

  interface createInviteCodeOutputDto {
    data: InviteCode;
  }

  const createInviteCode = async (
    input: createInviteCodeDto
  ): Promise<createInviteCodeOutputDto> => {
    const { inviteCode, expires_in_days } = input;

    const expires_at = expires_in_days
      ? new Date(Date.now() + expires_in_days * 24 * 60 * 60 * 1000) // convert days to milliseconds
      : null;

    const { data, error } = await supabase
      .from("invite_codes")
      .insert({
        code: inviteCode,
        inviter_id: profileState!.id,
        status: "active",
        expires_at,
      })
      .select()
      .single();

    //TODO: SEND INVITE CODE TO USER

    if (error) {
      if (error.code === "23505") {
        // Unique violation
        throw new Error("Code already exists, please try again");
      }
      throw error;
    }

    return data;
  };

  interface updateInviteCodeDto {
    inviteCodeId: string;
    status: InviteCodeStatus;
  }

  interface updateInviteCodeOutputDto {
    data: InviteCode;
  }

  const updateInviteCode = async (
    input: updateInviteCodeDto
  ): Promise<updateInviteCodeOutputDto> => {
    const { inviteCodeId, status } = input;

    const { data, error } = await supabase
      .from("invite_codes")
      .update({ status: status })
      .eq("id", inviteCodeId)
      .eq("status", "active")
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Code not found or already used");

    return data;
  };

  interface redeemInviteCodeDto {
    code: string;
  }

  interface redeemInviteCodeOutputDto {
    data: InviteCode;
  }

  const redeemInviteCode = async (
    input: redeemInviteCodeDto
  ): Promise<boolean> => {
    const { code } = input;

    const { data } = await getInviteCodes({
      filters: { code: code, status: InviteCodeStatus.ACTIVE },
    });

    if (!data) throw new Error("Code not found or already used");

    const inviteCode = data[0];

    switch (inviteCode.status) {
      case InviteCodeStatus.ACTIVE:
        break;
      case InviteCodeStatus.REDEEMED:
        throw new Error("Code has already been redeemed");

      case InviteCodeStatus.EXPIRED:
        throw new Error("Code has expired");
      case InviteCodeStatus.CANCELLED:
        throw new Error("Code has been cancelled");
    }

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
    });

    return true;

    // const { data, error } = await supabase
    //   .from("invite_codes")
    //   .update({ status: InviteCodeStatus.REDEEMED })
    //   .eq("id", inviteCodeId)
    //   .select()
    //   .single();
  };

  return {
    isLoaded,
    getInviteCodes,
    createInviteCode,
    updateInviteCode,
    redeemInviteCode,
  };
};
