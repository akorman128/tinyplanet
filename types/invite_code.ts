export interface InviteCode {
  id: string;
  code: string;
  inviter_id: string;
  status: "active" | "redeemed" | "cancelled" | "expired";
  metadata?: Record<string, any>;
  created_at: Date;
  expires_at?: Date;
  redeemed_at?: Date;
  redeemed_by_phone_number?: string;
}

export enum InviteCodeStatus {
  ACTIVE = "active",
  REDEEMED = "redeemed",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}
