import React, { useState } from "react";
import { View, ActivityIndicator, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuth } from "@/context/supabase-provider";

const phoneSchema = z.object({
	phoneNumber: z.string().min(10, "Please enter a valid phone number."),
});

const otpSchema = z.object({
	otp: z.string().min(6, "Please enter a valid OTP."),
});

export default function WelcomeScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const { sendOTP, verifyOTP } = useAuth();
	const [showOTP, setShowOTP] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");

	const appIcon =
		colorScheme === "dark"
			? require("@/assets/icon.png")
			: require("@/assets/icon-dark.png");

	const phoneForm = useForm<z.infer<typeof phoneSchema>>({
		resolver: zodResolver(phoneSchema),
		defaultValues: { phoneNumber: "" },
	});

	const otpForm = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: "" },
	});

	const handlePhoneSubmit = async (data: z.infer<typeof phoneSchema>) => {
		try {
			Keyboard.dismiss();
			const cleanPhoneNumber = data.phoneNumber.replace(/\D/g, "");
			await sendOTP(`+1${cleanPhoneNumber}`);
			setPhoneNumber(`+1${cleanPhoneNumber}`);
			setShowOTP(true);
		} catch (error: Error | any) {
			console.error(error.message);
		}
	};

	const handleOTPSubmit = async (data: z.infer<typeof otpSchema>) => {
		try {
			Keyboard.dismiss();
			await verifyOTP(phoneNumber, data.otp);
			router.push("/(protected)/(tabs)");
		} catch (error: Error | any) {
			console.error(error.message);
		}
	};

	const handleBackToPhone = () => {
		setShowOTP(false);
		setPhoneNumber("");
		otpForm.reset();
	};

	const renderPhoneForm = () => (
		<Form {...phoneForm}>
			<View className="gap-4">
				<FormField
					control={phoneForm.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormInput
							label="Phone Number"
							placeholder="Enter your phone number"
							autoCapitalize="none"
							autoComplete="tel"
							maxLength={6}
							autoCorrect={false}
							keyboardType="phone-pad"
							onSubmitEditing={phoneForm.handleSubmit(handlePhoneSubmit)}
							blurOnSubmit={true}
							returnKeyType="done"
							{...field}
						/>
					)}
				/>
				<Button
					size="default"
					variant="default"
					onPress={phoneForm.handleSubmit(handlePhoneSubmit)}
					disabled={phoneForm.formState.isSubmitting}
				>
					{phoneForm.formState.isSubmitting ? (
						<ActivityIndicator size="small" />
					) : (
						<Text>Send OTP</Text>
					)}
				</Button>
			</View>
		</Form>
	);

	const renderOTPForm = () => (
		<Form {...otpForm}>
			<View className="gap-4">
				<Button
					size="default"
					variant="secondary"
					onPress={handleBackToPhone}
					className="mb-2"
				>
					<Text>← Back</Text>
				</Button>

				<FormField
					control={otpForm.control}
					name="otp"
					render={({ field }) => (
						<FormInput
							label="OTP Code"
							placeholder="Enter the 6-digit code"
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="numeric"
							onSubmitEditing={otpForm.handleSubmit(handleOTPSubmit)}
							blurOnSubmit={true}
							returnKeyType="done"
							{...field}
						/>
					)}
				/>
				<Button
					size="default"
					variant="default"
					onPress={otpForm.handleSubmit(handleOTPSubmit)}
					disabled={otpForm.formState.isSubmitting}
				>
					{otpForm.formState.isSubmitting ? (
						<ActivityIndicator size="small" />
					) : (
						<Text>Verify OTP</Text>
					)}
				</Button>
			</View>
		</Form>
	);

	return (
		<SafeAreaView className="flex flex-1 bg-background p-4">
			<View className="flex flex-1 items-center justify-center gap-y-4 web:m-4">
				<Image source={appIcon} className="w-16 h-16 rounded-xl" />
				<H1 className="text-center">Welcome to Tiny Planet</H1>
				<Muted className="text-center">Your very own secret society.</Muted>

				<View className="flex flex-col gap-y-4 web:m-4 w-full max-w-sm">
					{showOTP ? renderOTPForm() : renderPhoneForm()}
				</View>
			</View>
		</SafeAreaView>
	);
}
