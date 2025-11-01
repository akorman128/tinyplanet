import { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Button, Heading, Subheading, Body, Input } from "@/design-system";
import { useSignupStore } from "@/stores/signupStore";

export default function UserDetailsPage() {
  const { signupData, setSignupData } = useSignupStore();

  // Initialize from store
  const [fullName, setFullName] = useState(signupData.fullName);
  const [birthday, setBirthday] = useState<Date | null>(
    signupData.birthday ? new Date(signupData.birthday) : null
  );
  const [hometown, setHometown] = useState(signupData.hometown);

  // UI state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    if (!birthday) {
      newErrors.birthday = "Birthday is required";
    }
    if (!hometown.trim()) {
      newErrors.hometown = "Hometown is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    // Save to store
    setSignupData({
      fullName: fullName.trim(),
      birthday: birthday!.toISOString(),
      hometown: hometown.trim(),
    });

    // TODO: Navigate to next screen when implemented
    console.log("User details saved to store. Ready for next screen.");
  };

  const handleBack = () => {
    // Save current progress before going back
    setSignupData({
      fullName: fullName.trim(),
      birthday: birthday?.toISOString() || "",
      hometown: hometown.trim(),
    });
    router.back();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setBirthday(selectedDate);
      setErrors({ ...errors, birthday: "" });
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
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md gap-6">
          <View className="gap-2">
            <Heading className="text-center">Tell us about you</Heading>
            <Subheading className="text-center">
              Like what&apos;s your deal?
            </Subheading>
          </View>

          <View className="gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setErrors({ ...errors, fullName: "" });
              }}
              placeholder="Enter your full name"
              autoCapitalize="words"
              error={errors.fullName}
            />

            <View className="w-full">
              <Body className="text-sm font-semibold text-gray-700 mb-2">
                Birthday
              </Body>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View
                  className={`py-4 px-4 rounded-xl border-2 bg-white ${
                    errors.birthday ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <Body
                    className={birthday ? "text-gray-900" : "text-gray-400"}
                  >
                    {birthday ? formatDate(birthday) : "Select your birthday"}
                  </Body>
                </View>
              </TouchableOpacity>
              {errors.birthday && (
                <Body className="text-sm text-red-500 mt-1">
                  {errors.birthday}
                </Body>
              )}
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={birthday || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            {Platform.OS === "ios" && showDatePicker && (
              <Button
                variant="secondary"
                onPress={() => setShowDatePicker(false)}
              >
                Done
              </Button>
            )}

            <Input
              label="Hometown"
              value={hometown}
              onChangeText={(text) => {
                setHometown(text);
                setErrors({ ...errors, hometown: "" });
              }}
              placeholder="Where are you from?"
              autoCapitalize="words"
              error={errors.hometown}
            />

            <View className="gap-3">
              <Button
                variant="primary"
                onPress={handleContinue}
                disabled={!fullName.trim() || !birthday || !hometown.trim()}
              >
                Continue
              </Button>

              <Button variant="secondary" onPress={handleBack}>
                Back
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
