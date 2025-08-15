import { supabase } from "@/config/supabase";
import type { AuthResponse, User } from "@supabase/supabase-js";

export class SupabaseClient {
	// ===== AUTHENTICATION METHODS =====

	/**
	 * Send OTP to phone number
	 */
	static async sendOTP(phoneNumber: string): Promise<AuthResponse> {
		const { data, error } = await supabase.auth.signInWithOtp({
			phone: phoneNumber,
		});

		if (error) {
			console.error("Error sending OTP:", error);
			throw error;
		}

		console.log("OTP sent successfully to:", phoneNumber);
		return { data, error: null };
	}

	/**
	 * Verify OTP and sign in user
	 */
	static async verifyOTP(
		phoneNumber: string,
		otp: string,
	): Promise<AuthResponse> {
		const { data, error } = await supabase.auth.verifyOtp({
			phone: phoneNumber,
			token: otp,
			type: "sms",
		});

		if (error) {
			console.error("Error verifying OTP:", error);
			throw error;
		}

		if (data.session) {
			console.log("User authenticated:", data.user);
		} else {
			console.log("No session returned from OTP verification");
		}

		return { data, error: null };
	}

	/**
	 * Sign out current user
	 */
	static async signOut(): Promise<void> {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error signing out:", error);
			throw error;
		}

		console.log("User signed out");
	}

	/**
	 * Get current session
	 */
	static async getSession() {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();

		if (error) {
			console.error("Error getting session:", error);
			throw error;
		}

		return session;
	}

	/**
	 * Get current user
	 */
	static async getCurrentUser(): Promise<User | null> {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error) {
			console.error("Error getting current user:", error);
			throw error;
		}

		return user;
	}

	// ===== USER PROFILE METHODS =====

	/**
	 * Get user profile from profiles table
	 */
	static async getUserProfile(userId: string) {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", userId)
			.single();

		if (error) {
			console.error("Error fetching profile:", error);
			throw error;
		}

		return data;
	}

	/**
	 * Update user profile
	 */
	static async updateUserProfile(userId: string, updates: Record<string, any>) {
		const { data, error } = await supabase
			.from("profiles")
			.update(updates)
			.eq("id", userId);

		if (error) {
			console.error("Error updating profile:", error);
			throw error;
		}

		return data;
	}
}
