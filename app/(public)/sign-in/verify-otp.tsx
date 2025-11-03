import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useSignIn } from "@/hooks/useSignIn";
import { Button, Input, Heading, Body } from "@/design-system";

// Zod schema for OTP validation
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

type OtpForm = z.infer<typeof otpSchema>;

export default function Page() {
  const { verifyOtp, isLoaded } = useSignIn();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: OtpForm) => {
    if (!isLoaded) return;

    try {
      await verifyOtp({
        phone: phone || "",
        token: data.otp,
      });
      // Navigation will be handled automatically after successful verification
      // as the auth state changes
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError("otp", {
        type: "manual",
        message: "Invalid verification code. Please try again.",
      });
    }
  };

  const onResendPress = async () => {
    // Navigate back to sign-in to resend the code
    router.back();
  };

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="p-4 gap-6"
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-2">
        <Heading>Verify your phone</Heading>
        <Body className="text-gray-600">
          We sent a code to {phone}. Enter it below to continue.
        </Body>
      </View>

      <View className="gap-4">
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Verification Code"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="000000"
              keyboardType="number-pad"
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
              maxLength={6}
              error={errors.otp?.message}
            />
          )}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !isLoaded}
        >
          Verify
        </Button>

        <Button variant="secondary" onPress={onResendPress}>
          Resend code
        </Button>
      </View>

      <View className="flex flex-row justify-center">
        <Body className="text-gray-600">Wrong number? </Body>
        <Body
          className="text-purple-600 font-semibold"
          onPress={() => router.back()}
        >
          Go back
        </Body>
      </View>
    </KeyboardAwareScrollView>
  );
}
