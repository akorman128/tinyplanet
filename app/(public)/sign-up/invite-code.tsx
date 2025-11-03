import { View, SafeAreaView } from "react-native";
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
      inviteCode: signupData.inviteCode || "",
    },
    mode: "all",
  });

  const onSubmit = async (data: InviteCodeForm) => {
    const code = data.inviteCode.trim();

    // const inviteCodes = await getInviteCodes({
    //   filters: {
    //     code: code,
    //   },
    // });

    // if (inviteCodes.data.length === 0) {
    //   setError("inviteCode", {
    //     type: "manual",
    //     message: "Invite code not found",
    //   });
    //   return;
    // }

    // Save to store
    setSignupData({ inviteCode: code });

    // Navigate to next screen
    router.push("/sign-up/user-details");
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
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
                  onChangeText={onChange}
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
    </SafeAreaView>
  );
}
