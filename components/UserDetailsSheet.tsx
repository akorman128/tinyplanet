import React, { forwardRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
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
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.loadingContainer}>
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
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <Avatar fullName={fullName} avatarUrl={avatarUrl} />
          </View>

          <Text style={styles.fullName}>{fullName}</Text>

          {hasVibes && (
            <Pressable style={styles.vibeContainer} onPress={handleVibePress}>
              <Text style={styles.vibeLabel}>
                Vibe ({totalVibeCount && totalVibeCount > 10 ? "10+" : totalVibeCount})
              </Text>
              <View style={styles.emojiGrid}>
                {countEmojis(vibeEmojis)
                  .slice(0, 6)
                  .map(([emoji, count]) => (
                    <View key={emoji} style={styles.emojiWithBadge}>
                      <Text style={styles.vibeEmojis}>{emoji}</Text>
                      {count > 1 && (
                        <View style={styles.countBadge}>
                          <Text style={styles.countText}>{count}</Text>
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

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.hex.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  handleIndicator: {
    backgroundColor: colors.hex.placeholder,
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.hex.purple900,
    marginBottom: 16,
    textAlign: "center",
  },
  vibeContainer: {
    marginBottom: 24,
    alignItems: "center",
    width: "100%",
  },
  vibeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.hex.placeholder,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  emojiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },
  emojiWithBadge: {
    position: "relative",
  },
  vibeEmojis: {
    fontSize: 32,
  },
  countBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: colors.hex.purple600,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  countText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.hex.white,
  },
});
