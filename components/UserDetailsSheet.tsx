import React, { forwardRef, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { colors, Avatar, InfoRow } from "@/design-system";
import { reverseGeocode } from "@/utils/reverseGeocode";
import { useRouter } from "expo-router";
import { VibeDisplay } from "./VibeDisplay";

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

          {vibeEmojis && vibeEmojis.length > 0 && (
            <VibeDisplay
              vibeEmojis={vibeEmojis}
              totalVibeCount={totalVibeCount}
              onPress={handleVibePress}
              maxDisplay={6}
            />
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
