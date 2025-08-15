import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

import { Session } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";
import { SupabaseClient } from "@/lib/supabase-client";

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
		await SupabaseClient.sendOTP(phoneNumber);
	};

	const verifyOTP = async (phoneNumber: string, otp: string) => {
		const { data } = await SupabaseClient.verifyOTP(phoneNumber, otp);
		if (data.session) {
			setSession(data.session);
		}
	};

	const signOut = async () => {
		await SupabaseClient.signOut();
		setSession(null);
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
