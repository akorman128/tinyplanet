import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, Input, Button, Body } from "@/design-system";
import { useProfileStore } from "@/stores/profileStore";
import { useProfile } from "@/hooks/useProfile";

// Zod schema for profile edit validation
const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .trim(),
  birthday: z.date({
    error: "Birthday is required",
  }),
  hometown: z
    .string()
    .min(1, "Hometown is required")
    .min(2, "Hometown must be at least 2 characters")
    .trim(),
  website: z.string().trim().optional(),
  avatarUrl: z.string().trim().optional(),
});

type EditProfileForm = z.infer<typeof editProfileSchema>;

export default function EditProfileScreen() {
  const router = useRouter();
  const { profileState } = useProfileStore();
  const { updateProfile } = useProfile();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: profileState?.full_name || "",
      birthday: profileState?.birthday
        ? new Date(profileState.birthday)
        : undefined,
      hometown: profileState?.hometown || "",
      website: profileState?.website || "",
      avatarUrl: profileState?.avatar_url || "",
    },
    mode: "all",
  });

  const onSubmit = async (data: EditProfileForm) => {
    setIsSubmitting(true);
    try {
      await updateProfile({
        updateData: {
          full_name: data.fullName.trim(),
          birthday: data.birthday.toISOString(),
          hometown: data.hometown.trim(),
          website: data.website?.trim() || "",
          avatar_url: data.avatarUrl?.trim() || "",
        },
      });

      // Show success message
      Alert.alert("Success", "Profile updated successfully", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (
    onChange: (date: Date) => void,
    _: any,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
      setValue("birthday", selectedDate, { shouldValidate: true });
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-100">
          <Pressable onPress={() => router.back()} className="py-2 pr-3">
            <Text className="text-base font-semibold text-purple-600">← Back</Text>
          </Pressable>
          <Text className="text-xl font-bold text-purple-900">Edit Profile</Text>
          <View className="w-15" />
        </View>

        {/* Form */}
        <KeyboardAwareScrollView
          className="flex-1"
          contentContainerClassName="px-6 pt-6 pb-12"
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-5">
            {/* Full Name */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your full name"
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  error={errors.fullName?.message}
                />
              )}
            />

            {/* Birthday */}
            <Controller
              control={control}
              name="birthday"
              render={({ field: { value, onChange } }) => (
                <>
                  <View className="w-full">
                    <Body className="text-sm font-semibold text-purple-900 mb-2">Birthday</Body>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <View
                        className={`py-4 px-4 rounded-xl border-2 bg-white ${
                          errors.birthday ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <Text
                          className={`text-base ${
                            value ? "text-purple-900" : "text-gray-400"
                          }`}
                        >
                          {value ? formatDate(value) : "Select your birthday"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {errors.birthday && (
                      <Text className="text-sm text-red-500 mt-1">
                        {errors.birthday.message}
                      </Text>
                    )}
                  </View>

                  {showDatePicker && (
                    <View className="bg-white rounded-xl p-4 gap-4">
                      <DateTimePicker
                        value={value || new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(event, date) =>
                          handleDateChange(onChange, event, date)
                        }
                        maximumDate={new Date()}
                        textColor="#000000"
                      />
                      {Platform.OS === "ios" && (
                        <Button
                          variant="secondary"
                          onPress={() => setShowDatePicker(false)}
                        >
                          Save
                        </Button>
                      )}
                    </View>
                  )}
                </>
              )}
            />

            {/* Hometown */}
            <Controller
              control={control}
              name="hometown"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Hometown"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Where are you from?"
                  autoCapitalize="words"
                  error={errors.hometown?.message}
                />
              )}
            />

            {/* Website */}
            <Controller
              control={control}
              name="website"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Website (Optional)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://example.com"
                  autoCapitalize="none"
                  autoComplete="url"
                  textContentType="URL"
                  keyboardType="url"
                  error={errors.website?.message}
                />
              )}
            />

            {/* Avatar URL */}
            <Controller
              control={control}
              name="avatarUrl"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Avatar URL (Optional)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="https://example.com/avatar.jpg"
                  autoCapitalize="none"
                  autoComplete="url"
                  textContentType="URL"
                  keyboardType="url"
                  error={errors.avatarUrl?.message}
                />
              )}
            />

            {/* Save Button */}
            <View className="mt-3">
              <Button
                variant="primary"
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
