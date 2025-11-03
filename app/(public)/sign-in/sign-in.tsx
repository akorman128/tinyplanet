import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useSignIn } from "@/hooks/useSignIn";
import { Button, Input, Heading, Body } from "@/design-system";

// Zod schema for phone number validation
const signInSchema = z.object({
  phone: z.string().min(10, "Phone number is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function Page() {
  const { signInWithPhoneNumber, isLoaded } = useSignIn();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: SignInForm) => {
    if (!isLoaded) return;

    try {
      const phone = `+1${data.phone.replace(/[^0-9]/g, "")}`;

      await signInWithPhoneNumber({
        phone,
      });

      router.push({
        pathname: "/sign-in/verify-otp",
        params: { phone },
      });
    } catch (err) {
      setError("phone", {
        type: "manual",
        message: "Failed to send verification code. Please try again.",
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="flex-1 justify-center p-4 gap-6"
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-2">
        <Heading className="text-center">Welcome back</Heading>
      </View>

      <View className="gap-4 ">
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Phone Number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="(917) 123-4567"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              error={errors.phone?.message}
            />
          )}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !isLoaded}
        >
          Continue
        </Button>
      </View>

      <View className="flex flex-row justify-center">
        <Body className="text-gray-600">Don&apos;t have an account? </Body>
        <Body
          className="text-purple-600 font-semibold"
          onPress={() => router.replace("/sign-up/invite-code")}
        >
          Sign up
        </Body>
      </View>
    </KeyboardAwareScrollView>
  );
}
