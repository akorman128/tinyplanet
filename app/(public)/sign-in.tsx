import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import * as z from "zod";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { useAuth } from "@/context/supabase-provider";

const formSchema = z.object({
	phoneNumber: z.string().min(10, "Please enter a valid phone number."),
	otp: z.string().min(6, "Please enter a valid OTP."),
});

export default function SignIn() {
	const { sendOTP } = useAuth();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phoneNumber: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await sendOTP(data.phoneNumber);

			form.reset();
		} catch (error: Error | any) {
			console.error(error.message);
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-background p-4" edges={["bottom"]}>
			<View className="flex-1 gap-4 web:m-4">
				<H1 className="self-start ">Sign In</H1>
				<Form {...form}>
					<View className="gap-4">
						<FormField
							control={form.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormInput
									label="Phone Number"
									placeholder="Phone Number"
									autoCapitalize="none"
									autoComplete="tel"
									autoCorrect={false}
									keyboardType="phone-pad"
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="otp"
							render={({ field }) => (
								<FormInput
									label="OTP"
									placeholder="OTP"
									autoCapitalize="none"
									autoCorrect={false}
									keyboardType="numeric"
									{...field}
								/>
							)}
						/>
					</View>
				</Form>
			</View>
			<Button
				size="default"
				variant="default"
				onPress={form.handleSubmit(onSubmit)}
				disabled={form.formState.isSubmitting}
				className="web:m-4"
			>
				{form.formState.isSubmitting ? (
					<ActivityIndicator size="small" />
				) : (
					<Text>Sign In</Text>
				)}
			</Button>
		</SafeAreaView>
	);
}
