import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { colors, Avatar, Button, InfoRow } from "@/design-system";
import { useProfileStore } from "@/stores/profileStore";
import { reverseGeocode } from "@/utils/reverseGeocode";

export default function ProfileScreen() {
  const router = useRouter();
  const { profileState } = useProfileStore();
  const [humanReadableLocation, setHumanReadableLocation] = useState<
    string | null
  >(null);
  const [geocoding, setGeocoding] = useState(false);

  // Reverse geocode location when it changes
  useEffect(() => {
    const geocodeLocation = async () => {
      if (
        !profileState?.latitude ||
        !profileState?.longitude ||
        profileState.latitude === undefined ||
        profileState.longitude === undefined
      ) {
        setHumanReadableLocation(null);
        return;
      }

      setGeocoding(true);
      try {
        const result = await reverseGeocode(
          profileState.longitude,
          profileState.latitude,
          (freshData) => {
            setHumanReadableLocation(freshData.formattedAddress);
          }
        );
        setHumanReadableLocation(result.formattedAddress);
      } catch (error) {
        console.error("Failed to geocode location:", error);
        setHumanReadableLocation(
          `${profileState.latitude.toFixed(4)}, ${profileState.longitude.toFixed(4)}`
        );
      } finally {
        setGeocoding(false);
      }
    };

    geocodeLocation();
  }, [profileState?.latitude, profileState?.longitude]);

  const formatBirthday = (birthday: string | undefined) => {
    if (!birthday) return "Not set";
    const date = new Date(birthday);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!profileState) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.hex.purple600} />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
          <Pressable onPress={() => router.back()} className="py-2 pr-3">
            <Text className="text-base font-semibold text-purple-600">
              ← Back
            </Text>
          </Pressable>
          <Text className="text-xl font-bold text-purple-900">My Profile</Text>
          <View className="w-15" />
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pt-8 pb-12 items-center"
        >
          {/* Avatar */}
          <View className="mb-4">
            <Avatar
              fullName={profileState.full_name}
              avatarUrl={profileState.avatar_url}
              size="large"
            />
          </View>

          {/* Full Name */}
          <Text className="text-3xl font-bold text-purple-900 mb-8 text-center">
            {profileState.full_name}
          </Text>

          {/* Info Sections */}
          <View className="w-full mb-8">
            {/* Phone Number */}
            {profileState.phone_number && (
              <InfoRow label="Phone Number" value={profileState.phone_number} />
            )}

            {/* Birthday */}
            {profileState.birthday && (
              <InfoRow
                label="Birthday"
                value={formatBirthday(profileState.birthday)}
              />
            )}

            {/* Hometown */}
            {profileState.hometown && (
              <InfoRow label="Hometown" value={profileState.hometown} />
            )}

            {/* Current Location */}
            {(profileState.latitude !== undefined ||
              profileState.longitude !== undefined) && (
              <InfoRow
                label="Current Location"
                value={humanReadableLocation || "Unknown location"}
                loading={geocoding}
              />
            )}

            {/* Website */}
            {profileState.website && (
              <InfoRow label="Website" value={profileState.website} />
            )}
          </View>

          {/* Edit Button */}
          <View className="w-full mt-2">
            <Button
              onPress={() => router.push("/edit-profile")}
              variant="primary"
            >
              Edit
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

