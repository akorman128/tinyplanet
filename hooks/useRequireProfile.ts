import { useProfileStore } from "@/stores/profileStore";
import { Profile } from "@/types/profile";

/**
 * Hook that asserts the profile is loaded and returns it with type safety.
 *
 * This hook should only be used in components/hooks within protected routes
 * where the profile is guaranteed to be loaded by the Stack.Protected guard.
 *
 * @throws {Error} If profileState is null (profile not loaded)
 * @returns {Profile} The loaded profile (never null)
 *
 * @example
 * ```typescript
 * export const useFriends = () => {
 *   const profile = useRequireProfile(); // Single assertion at top
 *
 *   const sendFriendRequest = async (input: SendFriendRequestInput) => {
 *     const userId = profile.id; // Direct access, no null checks
 *     // ...
 *   };
 * };
 * ```
 */
export const useRequireProfile = (): Profile => {
  const { profileState } = useProfileStore();

  if (!profileState) {
    throw new Error(
      "Profile not loaded. useRequireProfile() can only be called in authenticated routes " +
        "where profile is guaranteed to be loaded by Stack.Protected guard. " +
        "If you're seeing this error, there may be a bug in the route protection logic."
    );
  }

  return profileState;
};
