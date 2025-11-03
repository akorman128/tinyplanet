import { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Button, Heading, Subheading, Body, Input } from "@/design-system";
import { useSignupStore } from "@/stores/signupStore";

// Zod schema for user details validation
const userDetailsSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name is required")
    .min(2, "That's not your name, is it?")
    .trim(),
  birthday: z.date({
    error: "Birthday is required",
  }),
  hometown: z
    .string()
    .min(1, "Hometown is required")
    .min(2, "Hometown must be at least 2 characters")
    .trim(),
});

type UserDetailsForm = z.infer<typeof userDetailsSchema>;

export default function UserDetailsPage() {
  const { signupData, setSignupData } = useSignupStore();

  // UI state
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<UserDetailsForm>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      fullName: signupData.fullName || "",
      birthday: signupData.birthday ? new Date(signupData.birthday) : undefined,
      hometown: signupData.hometown || "",
    },
    mode: "all",
  });

  const onSubmit = (data: UserDetailsForm) => {
    setSignupData({
      fullName: data.fullName.trim(),
      birthday: data.birthday.toISOString(),
      hometown: data.hometown.trim(),
    });

    // Navigate to next screen
    router.push("/sign-up/phone-number");
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
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow items-center justify-center px-6"
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View className="w-full max-w-md gap-6">
        <View className="gap-2">
          <Heading className="text-center">Tell us about yourself</Heading>
          <Subheading className="text-center">
            Like what&apos;s your deal?
          </Subheading>
        </View>

        <View className="gap-4">
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

          <Controller
            control={control}
            name="birthday"
            render={({ field: { value, onChange } }) => (
              <>
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
                        className={value ? "text-gray-900" : "text-gray-400"}
                      >
                        {value ? formatDate(value) : "Select your birthday"}
                      </Body>
                    </View>
                  </TouchableOpacity>
                  {errors.birthday && (
                    <Body className="text-sm text-red-500 mt-1">
                      {errors.birthday.message}
                    </Body>
                  )}
                </View>

                {showDatePicker && (
                  <View className="bg-white rounded-xl p-4">
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
                        className="mt-4"
                      >
                        Done
                      </Button>
                    )}
                  </View>
                )}
              </>
            )}
          />

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
