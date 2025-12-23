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
} from "@/design-system";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useProfile } from "@/hooks/useProfile";
import { useVibe } from "@/hooks/useVibe";
import { useFriends } from "@/hooks/useFriends";
import { reverseGeocode } from "@/utils/reverseGeocode";
import { formatBirthday } from "@/utils";
import { Profile } from "@/types/profile";
import { FriendshipDisplayStatus } from "@/types/friendship";
import { VibeDisplay } from "@/components/VibeDisplay";
import { FriendStatusSection } from "@/components/FriendStatusSection";

// Constants
const MAX_VIBES_DISPLAY = 6;

export default function ProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const profile = useRequireProfile();
  const { getProfile } = useProfile();
  const { getVibes, isLoaded: vibeIsLoaded } = useVibe();
  const {
    getFriendshipStatus,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
  } = useFriends();

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
  const [friendshipStatus, setFriendshipStatus] = useState<
    FriendshipDisplayStatus | "loading"
  >("loading");
  const [mutualCount, setMutualCount] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);

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

  // Fetch friendship status and set mutual count from profile
  const fetchFriendshipData = useCallback(async () => {
    if (!displayProfile?.id || isViewingOwnProfile) {
      setFriendshipStatus(FriendshipDisplayStatus.NOT_FRIENDS);
      setMutualCount(0);
      return;
    }

    setFriendshipStatus("loading");
    try {
      const statusResult = await getFriendshipStatus(displayProfile.id);
      setFriendshipStatus(statusResult.status);
      // Use mutual_friend_count from the profile data (returned by RPC)
      setMutualCount(displayProfile.mutual_friend_count ?? 0);
    } catch (err) {
      setFriendshipStatus(FriendshipDisplayStatus.NOT_FRIENDS);
      setMutualCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayProfile?.id, displayProfile?.mutual_friend_count, isViewingOwnProfile]);

  useEffect(() => {
    fetchFriendshipData();
  }, [fetchFriendshipData]);

  // Fetch vibes for the displayed profile
  const fetchVibes = useCallback(async () => {
    if (!displayProfile?.id || !vibeIsLoaded) return;

    setVibesLoading(true);
    try {
      const result = await getVibes({ recipientId: displayProfile.id });
      const allEmojis = result.data.flatMap((vibe) => vibe.emojis);
      setVibeEmojis(allEmojis);
      setTotalVibeCount(result.data.length);
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

  // Friend action handlers
  const handleAddFriend = async () => {
    if (!userId) return;

    setActionLoading(true);
    try {
      await sendFriendRequest({
        targetUserId: userId,
      });
      setFriendshipStatus(FriendshipDisplayStatus.PENDING_SENT);
    } catch (err) {
      setError("Failed to send friend request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnfriend = async () => {
    if (!userId) return;

    setActionLoading(true);
    try {
      await unfriend({
        targetUserId: userId,
      });
      setFriendshipStatus(FriendshipDisplayStatus.NOT_FRIENDS);
    } catch (err) {
      setError("Failed to unfriend");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    if (!userId) return;

    setActionLoading(true);
    try {
      await acceptFriendRequest({
        fromUserId: userId,
      });
      setFriendshipStatus(FriendshipDisplayStatus.FRIENDS);
    } catch (err) {
      setError("Failed to accept friend request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeclineRequest = async () => {
    if (!userId) return;

    setActionLoading(true);
    try {
      await declineFriendRequest({
        targetUserId: userId,
      });
      setFriendshipStatus(FriendshipDisplayStatus.NOT_FRIENDS);
    } catch (err) {
      setError("Failed to decline friend request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    if (!userId) return;

    setActionLoading(true);
    try {
      await declineFriendRequest({
        targetUserId: userId,
      });
      setFriendshipStatus(FriendshipDisplayStatus.NOT_FRIENDS);
    } catch (err) {
      setError("Failed to cancel friend request");
    } finally {
      setActionLoading(false);
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
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12">
        {/* Header */}
        <ScreenHeader
          title={isViewingOwnProfile ? "My Profile" : "Profile"}
          showBackButton={true}
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

          {/* Full Name with Friend Status Icon */}
          <View className="flex-row items-center justify-center mb-2">
            <Heading className="text-purple-900 text-center">
              {displayProfile.full_name}
            </Heading>
            {!isViewingOwnProfile && (
              <FriendStatusSection
                status={friendshipStatus}
                onAddFriend={handleAddFriend}
                onUnfriend={handleUnfriend}
                onCancelRequest={handleCancelRequest}
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
                actionLoading={actionLoading}
              />
            )}
          </View>

          {/* Mutual Friends Badge - only show for other users' profiles */}
          {!isViewingOwnProfile && mutualCount > 0 && (
            <Pressable onPress={handleMutualsPress} className="mb-4">
              <Badge variant="secondary" size="small">
                {mutualCount === 1 ? "1 mutual" : `${mutualCount} mutuals`}
              </Badge>
            </Pressable>
          )}

          {/* Vibes */}
          {vibeEmojis.length > 0 && (
            <VibeDisplay
              vibeEmojis={vibeEmojis}
              totalVibeCount={totalVibeCount}
              onPress={handleVibePress}
              maxDisplay={MAX_VIBES_DISPLAY}
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
