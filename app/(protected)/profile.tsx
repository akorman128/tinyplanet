import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
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
import { useSupabase } from "@/hooks/useSupabase";
import { useLocation } from "@/hooks/useLocation";
import { useTravelPlan } from "@/hooks/useTravelPlan";
import { reverseGeocode } from "@/utils/reverseGeocode";
import { formatBirthday } from "@/utils";
import { Profile } from "@/types/profile";
import { TravelPlan } from "@/types/travelPlan";
import { VibeDisplay } from "@/components/VibeDisplay";
import { FriendStatusSection } from "@/components/FriendStatusSection";
import { CreateSheet } from "@/components/CreateSheet";

export default function ProfileScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const profile = useRequireProfile();
  const { getProfile } = useProfile();
  const { getTopVibes, isLoaded: vibeIsLoaded } = useVibe();
  const { signOut } = useSupabase();
  const { updateLocationInDatabase } = useLocation();
  const { getActiveTravelPlan, cancelTravelPlan } = useTravelPlan();

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
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [activeTravelPlan, setActiveTravelPlan] = useState<TravelPlan | null>(
    null
  );
  const [editingTravelPlan, setEditingTravelPlan] = useState<{
    id: string;
    destination: { name: string; latitude: number; longitude: number };
    start_date: string;
    duration_days: number;
    visibility: "friends" | "mutuals" | "public";
  } | null>(null);
  const createSheetRef = useRef<BottomSheet>(null);

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

  // Fetch active travel plan for own profile
  const loadActivePlan = useCallback(async () => {
    if (!isViewingOwnProfile) return;

    try {
      const { data } = await getActiveTravelPlan();
      setActiveTravelPlan(data);
    } catch (err) {
      console.error("Error loading travel plan:", err);
    }
  }, [isViewingOwnProfile, getActiveTravelPlan]);

  useEffect(() => {
    loadActivePlan();
  }, [loadActivePlan]);

  const handleCancelPlan = async () => {
    if (!activeTravelPlan) return;

    Alert.alert(
      "Cancel Travel Plan",
      "This will remove your travel plan and delete the post from feeds.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await cancelTravelPlan(activeTravelPlan.id);
              setActiveTravelPlan(null);
              Alert.alert("Success", "Travel plan cancelled");
            } catch (err) {
              console.error("Error cancelling plan:", err);
              Alert.alert("Error", "Failed to cancel travel plan");
            }
          },
        },
      ]
    );
  };

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
              <View className="flex-row items-center gap-2">
                <Pressable onPress={() => router.push("/edit-profile")}>
                  <Icons.edit size={24} color={colors.hex.purple600} />
                </Pressable>
                <Pressable onPress={() => router.push("/settings")}>
                  <Icons.settings size={24} color={colors.hex.purple600} />
                </Pressable>
              </View>
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
            {!isViewingOwnProfile && userId && (
              <Pressable
                onPress={() => router.push(`/chat/${userId}`)}
                className="mb-4"
              >
                <Badge variant="default" size="small">
                  Message
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

          {/* Posts Link */}
          {displayProfile && (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/user-posts",
                  params: { userId: displayProfile.id },
                })
              }
              className="w-full mb-4 px-4 py-3 bg-purple-50 rounded-lg flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-3">
                <Icons.posts size={32} color={colors.hex.purple600} />
                <Text className="text-base font-semibold text-purple-900">
                  Posts
                </Text>
              </View>
              <Icons.chevronRight size={20} color={colors.hex.purple600} />
            </Pressable>
          )}

          <View className="w-full mb-4">
            {displayProfile.birthday && (
              <InfoRow
                label="Birthday"
                value={formatBirthday(displayProfile.birthday)}
              />
            )}

            {displayProfile.hometown && (
              <InfoRow label="Hometown" value={displayProfile.hometown} />
            )}

            {isViewingOwnProfile &&
              displayProfile.latitude === undefined &&
              displayProfile.longitude === undefined && (
                <View className="w-full mb-4 px-4 py-3 bg-yellow-50 rounded-lg">
                  <Text className="text-sm text-gray-700 mb-2">
                    Current location not set
                  </Text>
                  <Button
                    size="sm"
                    variant="secondary"
                    onPress={async () => {
                      setUpdatingLocation(true);
                      try {
                        // Force update location in database
                        // This will also update the profile store automatically
                        await updateLocationInDatabase(true);
                      } catch (err) {
                        console.error("Error updating location:", err);
                        setError("Failed to update location");
                      } finally {
                        setUpdatingLocation(false);
                      }
                    }}
                    disabled={updatingLocation}
                  >
                    {updatingLocation ? "Updating..." : "Update Location"}
                  </Button>
                </View>
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

          {/* Travel Plan Section - creation removed, now done from main feed */}

          {isViewingOwnProfile && activeTravelPlan && (
            <View className="w-full mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Text className="text-lg font-bold text-gray-900 mb-2">
                Active Travel Plan
              </Text>
              <View className="mb-3">
                <Text className="text-base text-gray-900 mb-1">
                  🚀 {activeTravelPlan.destination_name}
                </Text>
                <Text className="text-sm text-gray-600">
                  {new Date(activeTravelPlan.start_date).toLocaleDateString()} →{" "}
                  {new Date(activeTravelPlan.end_date).toLocaleDateString()}
                </Text>
                <Text className="text-sm text-gray-600">
                  {activeTravelPlan.duration_days}{" "}
                  {activeTravelPlan.duration_days === 1 ? "day" : "days"}
                </Text>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onPress={() => {
                      setEditingTravelPlan({
                        id: activeTravelPlan.id,
                        destination: {
                          name: activeTravelPlan.destination_name,
                          longitude: parseFloat(
                            activeTravelPlan.destination_location.match(
                              /POINT\(([^ ]+) ([^ ]+)\)/
                            )?.[1] || "0"
                          ),
                          latitude: parseFloat(
                            activeTravelPlan.destination_location.match(
                              /POINT\(([^ ]+) ([^ ]+)\)/
                            )?.[2] || "0"
                          ),
                        },
                        start_date: activeTravelPlan.start_date,
                        duration_days: activeTravelPlan.duration_days,
                        visibility: "friends", // Default, as post visibility not stored in travel_plans table
                      });
                      createSheetRef.current?.snapToIndex(0);
                    }}
                  >
                    Edit
                  </Button>
                </View>
                <View className="flex-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onPress={handleCancelPlan}
                  >
                    Cancel Plan
                  </Button>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
