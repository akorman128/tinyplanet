import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

import { Session } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";

type AuthState = {
	initialized: boolean;
	session: Session | null;
	sendOTP: (phoneNumber: string) => Promise<void>;
	verifyOTP: (phoneNumber: string, otp: string) => Promise<void>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
	initialized: false,
	session: null,
	sendOTP: async () => {},
	verifyOTP: async () => {},
	signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Session | null>(null);

	const sendOTP = async (phoneNumber: string) => {
		const { data, error } = await supabase.auth.signInWithOtp({
			phone: phoneNumber,
		});

		if (error) {
			console.error("Error sending OTP:", error);
			throw error;
		}

		console.log("OTP sent successfully to:", phoneNumber);
	};

	const verifyOTP = async (phoneNumber: string, otp: string) => {
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
			setSession(data.session);
			console.log("User authenticated:", data.user);
		} else {
			console.log("No session returned from OTP verification");
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error signing out:", error);
			throw error;
		} else {
			setSession(null);
			console.log("User signed out");
		}
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		setInitialized(true);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				initialized,
				session,
				sendOTP,
				verifyOTP,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
