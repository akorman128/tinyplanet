import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInviteCodes } from "@/hooks/useInviteCodes";
import { Button, Heading, Subheading, Input } from "@/design-system";
import { useSignupStore } from "@/stores/signupStore";

// Zod schema for invite code validation
const inviteCodeSchema = z.object({
  inviteCode: z.string().min(1, "Invite code is required").trim(),
});

type InviteCodeForm = z.infer<typeof inviteCodeSchema>;

export default function InviteCodePage() {
  const { signupData, setSignupData } = useSignupStore();
  const { getInviteCodes } = useInviteCodes();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<InviteCodeForm>({
    resolver: zodResolver(inviteCodeSchema),
    defaultValues: {
      inviteCode: signupData.inviteCode.code,
    },
    mode: "all",
  });

  const onSubmit = async (data: InviteCodeForm) => {
    const code = data.inviteCode.trim().toUpperCase();

    const { data: inviteCodes } = await getInviteCodes({
      filters: { code: code },
    });

    if (inviteCodes.length === 0) {
      setError("inviteCode", {
        type: "manual",
        message: "Invite code not found",
      });
      return;
    }

    // Save to store
    setSignupData({
      inviteCode: inviteCodes[0],
    });

    // Navigate to next screen
    router.push("/sign-up/location-permission");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow items-center justify-center px-6"
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View className="w-full max-w-md gap-6">
        <View className="gap-2">
          <Heading className="text-center">What&apos;s the password?</Heading>
          <Subheading className="text-center">
            Enter your invite code to get started
          </Subheading>
        </View>

        <View className="gap-4">
          <Controller
            control={control}
            name="inviteCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Invite Code"
                value={value}
                onChangeText={(text: string) => onChange(text.toUpperCase())}
                onBlur={onBlur}
                placeholder="Enter your invite code"
                autoCapitalize="characters"
                error={errors.inviteCode?.message}
              />
            )}
          />

          <Button
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Continue
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
