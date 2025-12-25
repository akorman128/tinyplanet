import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import {
  Avatar,
  Button,
  InfoRow,
  ScreenHeader,
  Badge,
  LoadingState,
  ErrorState,
  Heading,
  Icons,
  colors,
  SocialMediaLinks,
} from "@/design-system";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useProfile } from "@/hooks/useProfile";
import { useVibe } from "@/hooks/useVibe";
import { reverseGeocode } from "@/utils/reverseGeocode";
import { formatBirthday } from "@/utils";
import { Profile } from "@/types/profile";
import { VibeDisplay } from "@/components/VibeDisplay";
import { FriendStatusSection } from "@/components/FriendStatusSection";

export default function ProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const profile = useRequireProfile();
  const { getProfile } = useProfile();
  const { getTopVibes, isLoaded: vibeIsLoaded } = useVibe();

  const [otherUserProfile, setOtherUserProfile] = useState<Profile | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [humanReadableLocation, setHumanReadableLocation] = useState<
    string | null
  >(null);
  const [geocoding, setGeocoding] = useState(false);
  const [topVibes, setTopVibes] = useState<{ emoji: string; count: number }[]>(
    []
  );
  const [totalVibeCount, setTotalVibeCount] = useState(0);
  const [vibesLoading, setVibesLoading] = useState(false);
  const [mutualCount, setMutualCount] = useState(0);

  // Determine which profile to display (memoized)
  const isViewingOwnProfile = useMemo(() => !userId, [userId]);
  const displayProfile = useMemo(
    () => (isViewingOwnProfile ? profile : otherUserProfile),
    [isViewingOwnProfile, profile, otherUserProfile]
  );

  // Fetch other user's profile if userId is provided
  const fetchOtherUserProfile = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const profile = await getProfile({ userId });
      setOtherUserProfile(profile);
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    fetchOtherUserProfile();
  }, [fetchOtherUserProfile]);

  // Set mutual count from profile data
  useEffect(() => {
    if (displayProfile && !isViewingOwnProfile) {
      setMutualCount(displayProfile.mutual_friend_count ?? 0);
    } else {
      setMutualCount(0);
    }
  }, [displayProfile, isViewingOwnProfile]);

  // Fetch vibes for the displayed profile
  const fetchVibes = useCallback(async () => {
    if (!displayProfile?.id || !vibeIsLoaded) return;

    setVibesLoading(true);
    try {
      const result = await getTopVibes({
        userId: displayProfile.id,
        limit: 5,
      });
      setTopVibes(result.data);
      setTotalVibeCount(result.totalCount);
    } catch (err) {
      // Silently fail for vibes
    } finally {
      setVibesLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayProfile?.id, vibeIsLoaded]);

  useEffect(() => {
    fetchVibes();
  }, [fetchVibes]);

  // Reverse geocode location when it changes
  const geocodeLocation = useCallback(async () => {
    if (!displayProfile?.latitude || !displayProfile?.longitude) {
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
      setHumanReadableLocation(
        `${displayProfile.latitude.toFixed(4)}, ${displayProfile.longitude.toFixed(4)}`
      );
    } finally {
      setGeocoding(false);
    }
  }, [displayProfile?.latitude, displayProfile?.longitude]);

  useEffect(() => {
    geocodeLocation();
  }, [geocodeLocation]);

  const handleVibePress = () => {
    if (displayProfile?.id) {
      router.push({
        pathname: "/all-vibes",
        params: { userId: displayProfile.id },
      });
    }
  };

  const handleMutualsPress = () => {
    if (userId) {
      router.push({ pathname: "/mutuals", params: { userId } });
    }
  };

  // Loading state
  if (loading || (!isViewingOwnProfile && !otherUserProfile)) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 bg-white pt-12">
          <ScreenHeader title="Profile" showBackButton={true} />
          <LoadingState />
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
          <ScreenHeader title="Profile" showBackButton={true} />
          <ErrorState message={error || "Profile not found"} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{ headerShown: false, title: profile.full_name }}
      />
      <View className="flex-1 bg-white pt-8">
        {/* Header */}
        <ScreenHeader
          title={"Profile"}
          showBackButton={true}
          rightComponent={
            isViewingOwnProfile ? (
              <Pressable onPress={() => router.push("/edit-profile")}>
                <Icons.edit size={24} color={colors.hex.purple600} />
              </Pressable>
            ) : undefined
          }
        />

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pt-8 pb-8 items-center"
        >
          <View className="mb-4">
            <Avatar
              fullName={displayProfile.full_name}
              avatarUrl={displayProfile.avatar_url}
              size="large"
            />
          </View>

          <View className="flex-row items-center justify-center mb-2">
            <Heading className="text-purple-900 text-center">
              {displayProfile.full_name}
            </Heading>
          </View>

          <SocialMediaLinks
            website={displayProfile.website}
            instagram={displayProfile.instagram}
            x={displayProfile.x}
            letterboxd={displayProfile.letterboxd}
            beli={displayProfile.beli}
          />

          <View className="flex-row items-center justify-center gap-2 mb-2">
            {!isViewingOwnProfile && userId && (
              <FriendStatusSection
                userId={userId}
                onError={(errorMessage) => setError(errorMessage)}
              />
            )}

            {!isViewingOwnProfile && mutualCount > 0 && (
              <Pressable onPress={handleMutualsPress} className="mb-4">
                <Badge variant="secondary" size="small">
                  {mutualCount === 1 ? "1 mutual" : `${mutualCount} mutuals`}
                </Badge>
              </Pressable>
            )}
          </View>

          <VibeDisplay
            topVibes={topVibes}
            totalVibeCount={totalVibeCount}
            onPress={handleVibePress}
            recipientId={!isViewingOwnProfile ? displayProfile.id : undefined}
            onVibeCreated={fetchVibes}
          />

          <View className="w-full mb-8">
            {isViewingOwnProfile && displayProfile.phone_number && (
              <InfoRow
                label="Phone Number"
                value={displayProfile.phone_number}
              />
            )}

            {displayProfile.birthday && (
              <InfoRow
                label="Birthday"
                value={formatBirthday(displayProfile.birthday)}
              />
            )}

            {displayProfile.hometown && (
              <InfoRow label="Hometown" value={displayProfile.hometown} />
            )}

            {(displayProfile.latitude !== undefined ||
              displayProfile.longitude !== undefined) && (
              <InfoRow
                label="Current Location"
                value={humanReadableLocation || "Unknown location"}
                loading={geocoding}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
