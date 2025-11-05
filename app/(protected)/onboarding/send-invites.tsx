import { useState } from "react";
import { View, Alert } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Heading, Subheading } from "@/design-system";
import { useVibe } from "@/hooks/useVibe";
import { useInviteCodes } from "@/hooks/useInviteCodes";
import { useContactPicker } from "@/hooks/useContactPicker";
import { useSignupStore } from "@/stores/signupStore";
import { isValidVibe, extractEmojis } from "@/utils/emojiValidation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VibePhoneForm } from "@/components";

// Zod schema for vibe creation
const vibeSchema = z.object({
  emojis: z
    .string()
    .min(1, "Please enter 3 emojis")
    .refine((val) => isValidVibe(val), {
      message: "Please enter exactly 3 emojis",
    }),
  phone: z.string().min(10, "Phone number is required"),
});

type VibeForm = z.infer<typeof vibeSchema>;

export default function CreateVibePage() {
  const { signupData } = useSignupStore();
  const { createOrUpdateVibe } = useVibe();
  const { createInviteCode, sendInviteCode } = useInviteCodes();
  const { pickContact: pickContactFromDevice } = useContactPicker();

  const [isSending, setIsSending] = useState(false);

  // Initialize 2 separate forms
  const form1 = useForm<VibeForm>({
    resolver: zodResolver(vibeSchema),
    defaultValues: { emojis: "", phone: "" },
    mode: "all",
  });

  const form2 = useForm<VibeForm>({
    resolver: zodResolver(vibeSchema),
    defaultValues: { emojis: "", phone: "" },
    mode: "all",
  });

  const forms = [form1, form2];

  // Check if all 2 forms are valid
  const allFormsValid = form1.formState.isValid && form2.formState.isValid;

  const pickContact = async (formIndex: number) => {
    const phoneNumber = await pickContactFromDevice();
    if (phoneNumber) {
      forms[formIndex].setValue("phone", phoneNumber, { shouldValidate: true });
    }
  };

  const sendAllInvites = async () => {
    if (!allFormsValid) {
      Alert.alert("Incomplete", "Please fill out all 2 invite forms");
      return;
    }

    setIsSending(true);

    try {
      const formData = [form1.getValues(), form2.getValues()];

      // Process all 2 invites in parallel
      const sendPromises = formData.map(async (data) => {
        const emojiArray = extractEmojis(data.emojis);
        const phoneNumber = data.phone;

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const { data: inviteCodeData, code } = await createInviteCode({
          expires_at: expiresAt,
        });

        await createOrUpdateVibe({
          receiverId: null,
          emojis: emojiArray,
          inviteCodeId: inviteCodeData.id,
        });

        await sendInviteCode({
          phone_number: phoneNumber,
          invite_code: code,
          inviter_name: signupData.fullName,
        });
      });

      await Promise.all(sendPromises);

      // Navigate immediately to next screen
      router.replace("/(protected)/(tabs)");
    } catch (error: any) {
      console.error("Error sending invites:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to send invites. Please try again."
      );
      setIsSending(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow px-6 py-12 items-center justify-center"
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-6">
        <View className="gap-2">
          <Heading className="text-center">
            Who are your best friends in the 🌍?
          </Heading>
          <Subheading className="text-center">
            Describe their vibe with 3 emojis
          </Subheading>
        </View>

        <View className="gap-6">
          <VibePhoneForm
            control={form1.control}
            vibeError={form1.formState.errors?.emojis?.message}
            phoneError={form1.formState.errors?.phone?.message}
            onSelectContact={() => pickContact(0)}
          />
          <VibePhoneForm
            control={form2.control}
            vibeError={form2.formState.errors?.emojis?.message}
            phoneError={form2.formState.errors?.phone?.message}
            onSelectContact={() => pickContact(1)}
          />
        </View>

        <View className="pt-6">
          <Button
            onPress={sendAllInvites}
            disabled={!allFormsValid || isSending}
          >
            {isSending ? "Sending..." : "Send Invites"}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
