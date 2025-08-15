import { SupabaseClient } from "@/lib/supabase-client";

/**
 * Custom hook for accessing Supabase client methods
 * Provides easy access to all database operations
 */
export const useSupabase = () => {
	// ===== AUTHENTICATION METHODS =====
	const sendOTP = (phoneNumber: string) => SupabaseClient.sendOTP(phoneNumber);
	const verifyOTP = (phoneNumber: string, otp: string) =>
		SupabaseClient.verifyOTP(phoneNumber, otp);
	const signOut = () => SupabaseClient.signOut();
	const getSession = () => SupabaseClient.getSession();
	const getCurrentUser = () => SupabaseClient.getCurrentUser();

	// ===== USER PROFILE METHODS =====
	const getUserProfile = (userId: string) =>
		SupabaseClient.getUserProfile(userId);
	const updateUserProfile = (userId: string, updates: Record<string, any>) =>
		SupabaseClient.updateUserProfile(userId, updates);

	return {
		// Auth
		sendOTP,
		verifyOTP,
		signOut,
		getSession,
		getCurrentUser,

		// Profiles
		getUserProfile,
		updateUserProfile,
	};
};
