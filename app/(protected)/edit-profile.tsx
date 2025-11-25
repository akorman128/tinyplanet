import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Form */}
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
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
                  <View style={styles.fieldContainer}>
                    <Body style={styles.fieldLabel}>Birthday</Body>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <View
                        style={[
                          styles.datePickerButton,
                          errors.birthday && styles.datePickerButtonError,
                        ]}
                      >
                        <Text
                          style={[
                            styles.datePickerText,
                            !value && styles.datePickerPlaceholder,
                          ]}
                        >
                          {value ? formatDate(value) : "Select your birthday"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {errors.birthday && (
                      <Text style={styles.errorText}>
                        {errors.birthday.message}
                      </Text>
                    )}
                  </View>

                  {showDatePicker && (
                    <View style={styles.datePickerContainer}>
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
            <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.hex.white,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.hex.purple600,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.hex.purple900,
  },
  headerSpacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
  },
  formContainer: {
    gap: 20,
  },
  fieldContainer: {
    width: "100%",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.hex.purple900,
    marginBottom: 8,
  },
  datePickerButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: colors.hex.white,
  },
  datePickerButtonError: {
    borderColor: colors.hex.error,
  },
  datePickerText: {
    fontSize: 16,
    color: colors.hex.purple900,
  },
  datePickerPlaceholder: {
    color: colors.hex.placeholder,
  },
  errorText: {
    fontSize: 14,
    color: colors.hex.error,
    marginTop: 4,
  },
  datePickerContainer: {
    backgroundColor: colors.hex.white,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  buttonContainer: {
    marginTop: 12,
  },
});
