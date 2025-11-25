import React, { forwardRef, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { colors, Avatar, InfoRow } from "@/design-system";
import { reverseGeocode } from "@/utils/reverseGeocode";
import { countEmojis } from "@/utils";
import { useRouter } from "expo-router";

interface UserDetailsSheetProps {
  userId: string | null;
  fullName: string;
  avatarUrl?: string;
  vibeEmojis?: string[];
  totalVibeCount?: number;
  latitude?: number;
  longitude?: number;
  hometown?: string;
  loading?: boolean;
  onSheetChange?: (index: number) => void;
}

export const UserDetailsSheet = forwardRef<
  BottomSheet,
  UserDetailsSheetProps
>(
  (
    {
      userId,
      fullName,
      avatarUrl,
      vibeEmojis,
      totalVibeCount,
      latitude,
      longitude,
      hometown,
      loading = false,
      onSheetChange,
    },
    ref
  ) => {
    const router = useRouter();
    const [humanReadableLocation, setHumanReadableLocation] = useState<
      string | null
    >(null);
    const [geocoding, setGeocoding] = useState(false);

    // Reverse geocode location when it changes (with cache support)
    useEffect(() => {
      const geocodeLocation = async () => {
        if (latitude === undefined || longitude === undefined) {
          setHumanReadableLocation(null);
          return;
        }

        setGeocoding(true);
        try {
          // Use cached data with stale-while-revalidate pattern
          const result = await reverseGeocode(
            longitude,
            latitude,
            (freshData) => {
              // Update with fresh data if cache was stale
              setHumanReadableLocation(freshData.formattedAddress);
            }
          );
          setHumanReadableLocation(result.formattedAddress);
        } catch (error) {
          console.error("Failed to geocode location:", error);
          setHumanReadableLocation(
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          );
        } finally {
          setGeocoding(false);
        }
      };

      geocodeLocation();
    }, [latitude, longitude]);

    const hasLocation = latitude !== undefined && longitude !== undefined;
    const hasVibes = vibeEmojis && vibeEmojis.length > 0;

    const handleVibePress = () => {
      if (userId) {
        router.push({ pathname: "/all-vibes", params: { userId } });
      }
    };

    if (!fullName || loading) {
      return (
        <BottomSheet
          ref={ref}
          index={-1}
          snapPoints={["50%"]}
          enablePanDownToClose
          onChange={onSheetChange}
          backgroundStyle={{
            backgroundColor: colors.hex.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.hex.placeholder,
            width: 40,
            height: 4,
          }}
        >
          <BottomSheetView className="flex-1 px-6 pt-2 pb-6">
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color={colors.hex.purple600} />
            </View>
          </BottomSheetView>
        </BottomSheet>
      );
    }

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["50%"]}
        enablePanDownToClose
        onChange={onSheetChange}
        backgroundStyle={{
          backgroundColor: colors.hex.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.hex.placeholder,
          width: 40,
          height: 4,
        }}
      >
        <BottomSheetView className="flex-1 px-6 pt-2 pb-6 items-center">
          <View className="mb-4">
            <Avatar fullName={fullName} avatarUrl={avatarUrl} />
          </View>

          <Text
            className="text-2xl font-bold text-center mb-4"
            style={{ color: colors.hex.purple900 }}
          >
            {fullName}
          </Text>

          {hasVibes && (
            <Pressable className="mb-6 items-center w-full" onPress={handleVibePress}>
              <Text
                className="text-sm font-semibold uppercase mb-2"
                style={{ color: colors.hex.placeholder, letterSpacing: 0.5 }}
              >
                Vibe ({totalVibeCount && totalVibeCount > 10 ? "10+" : totalVibeCount})
              </Text>
              <View className="flex-row flex-wrap gap-4 justify-center">
                {countEmojis(vibeEmojis)
                  .slice(0, 6)
                  .map(([emoji, count]) => (
                    <View key={emoji} className="relative">
                      <Text className="text-[32px]">{emoji}</Text>
                      {count > 1 && (
                        <View
                          className="absolute -top-1 -right-1 rounded-full min-w-[20px] h-5 justify-center items-center px-1.5"
                          style={{ backgroundColor: colors.hex.purple600 }}
                        >
                          <Text className="text-xs font-bold text-white">
                            {count}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
              </View>
            </Pressable>
          )}

          {hasLocation && (
            <InfoRow
              label="Current Location"
              value={humanReadableLocation || "Unknown location"}
              loading={geocoding}
            />
          )}

          {hometown && <InfoRow label="Hometown" value={hometown} />}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

UserDetailsSheet.displayName = "UserDetailsSheet";
