import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { colors, Avatar, Button, InfoRow, ScreenHeader } from "@/design-system";
import { useProfileStore } from "@/stores/profileStore";
import { useProfile } from "@/hooks/useProfile";
import { useVibe } from "@/hooks/useVibe";
import { reverseGeocode } from "@/utils/reverseGeocode";
import { Profile } from "@/types/profile";
import { VibeDisplay } from "@/components/VibeDisplay";

export default function ProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const { profileState } = useProfileStore();
  const { getProfile } = useProfile();
  const { getVibes, isLoaded: vibeIsLoaded } = useVibe();

  const [otherUserProfile, setOtherUserProfile] = useState<Profile | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [humanReadableLocation, setHumanReadableLocation] = useState<
    string | null
  >(null);
  const [geocoding, setGeocoding] = useState(false);
  const [vibeEmojis, setVibeEmojis] = useState<string[]>([]);
  const [totalVibeCount, setTotalVibeCount] = useState(0);
  const [vibesLoading, setVibesLoading] = useState(false);

  // Determine which profile to display
  const isViewingOwnProfile = !userId;
  const displayProfile = isViewingOwnProfile ? profileState : otherUserProfile;

  // Fetch other user's profile if userId is provided
  useEffect(() => {
    const fetchOtherUserProfile = async () => {
      if (!userId) return;

      setLoading(true);
      setError(null);
      try {
        const profile = await getProfile({ userId });
        setOtherUserProfile(profile);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchOtherUserProfile();
  }, [userId, getProfile]);

  // Fetch vibes for the displayed profile
  useEffect(() => {
    const fetchVibes = async () => {
      if (!displayProfile?.id || !vibeIsLoaded) return;

      setVibesLoading(true);
      try {
        const result = await getVibes({ recipientId: displayProfile.id });
        const allEmojis = result.data.flatMap((vibe) => vibe.emojis);
        setVibeEmojis(allEmojis);
        setTotalVibeCount(result.data.length);
      } catch (err) {
        console.error("Error fetching vibes:", err);
        // Don't show error for vibes, just log it
      } finally {
        setVibesLoading(false);
      }
    };

    fetchVibes();
  }, [displayProfile?.id, getVibes, vibeIsLoaded]);

  // Reverse geocode location when it changes
  useEffect(() => {
    const geocodeLocation = async () => {
      if (
        !displayProfile?.latitude ||
        !displayProfile?.longitude ||
        displayProfile.latitude === undefined ||
        displayProfile.longitude === undefined
      ) {
        setHumanReadableLocation(null);
        return;
      }

      setGeocoding(true);
      try {
        const result = await reverseGeocode(
          displayProfile.longitude,
          displayProfile.latitude,
          (freshData) => {
            setHumanReadableLocation(freshData.formattedAddress);
          }
        );
        setHumanReadableLocation(result.formattedAddress);
      } catch (error) {
        console.error("Failed to geocode location:", error);
        setHumanReadableLocation(
          `${displayProfile.latitude.toFixed(4)}, ${displayProfile.longitude.toFixed(4)}`
        );
      } finally {
        setGeocoding(false);
      }
    };

    geocodeLocation();
  }, [displayProfile?.latitude, displayProfile?.longitude]);

  const formatBirthday = (birthday: string | undefined) => {
    if (!birthday) return "Not set";
    const date = new Date(birthday);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleVibePress = () => {
    if (displayProfile?.id) {
      router.push({ pathname: "/all-vibes", params: { userId: displayProfile.id } });
    }
  };

  // Loading state
  if (loading || (!isViewingOwnProfile && !otherUserProfile)) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <ScreenHeader title="Profile" showBackButton={!isViewingOwnProfile} />
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.hex.purple600} />
          </View>
        </View>
      </>
    );
  }

  // Error state
  if (error || !displayProfile) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <ScreenHeader title="Profile" showBackButton={!isViewingOwnProfile} />
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-base text-gray-400 text-center">
              {error || "Profile not found"}
            </Text>
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
        <ScreenHeader
          title={isViewingOwnProfile ? "My Profile" : "Profile"}
          showBackButton={!isViewingOwnProfile}
        />

        {/* Content */}
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pt-8 pb-12 items-center"
        >
          {/* Avatar */}
          <View className="mb-4">
            <Avatar
              fullName={displayProfile.full_name}
              avatarUrl={displayProfile.avatar_url}
              size="large"
            />
          </View>

          {/* Full Name */}
          <Text className="text-3xl font-bold text-purple-900 mb-8 text-center">
            {displayProfile.full_name}
          </Text>

          {/* Vibes */}
          {vibeEmojis.length > 0 && (
            <VibeDisplay
              vibeEmojis={vibeEmojis}
              totalVibeCount={totalVibeCount}
              onPress={handleVibePress}
              maxDisplay={6}
            />
          )}

          {/* Info Sections */}
          <View className="w-full mb-8">
            {/* Phone Number - only show for own profile */}
            {isViewingOwnProfile && displayProfile.phone_number && (
              <InfoRow
                label="Phone Number"
                value={displayProfile.phone_number}
              />
            )}

            {/* Birthday */}
            {displayProfile.birthday && (
              <InfoRow
                label="Birthday"
                value={formatBirthday(displayProfile.birthday)}
              />
            )}

            {/* Hometown */}
            {displayProfile.hometown && (
              <InfoRow label="Hometown" value={displayProfile.hometown} />
            )}

            {/* Current Location */}
            {(displayProfile.latitude !== undefined ||
              displayProfile.longitude !== undefined) && (
              <InfoRow
                label="Current Location"
                value={humanReadableLocation || "Unknown location"}
                loading={geocoding}
              />
            )}

            {/* Website */}
            {displayProfile.website && (
              <InfoRow label="Website" value={displayProfile.website} />
            )}
          </View>

          {/* Edit Button - only show for own profile */}
          {isViewingOwnProfile && (
            <View className="w-full mt-2">
              <Button
                onPress={() => router.push("/edit-profile")}
                variant="primary"
              >
                Edit
              </Button>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
