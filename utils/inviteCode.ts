/**
 * Generate a random 8-character invite code
 * Uses uppercase letters and numbers, excluding ambiguous characters (I, O, 0, 1)
 * @returns A unique 8-character invite code string
 */
export const generateInviteCode = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous chars
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
