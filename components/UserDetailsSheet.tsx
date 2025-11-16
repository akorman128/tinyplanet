import React, { forwardRef, useMemo, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { colors, Avatar } from "@/design-system";
import { reverseGeocode } from "@/utils/reverseGeocode";
import { countEmojis } from "@/utils";

interface UserDetailsSheetProps {
  userId: string | null;
  fullName: string;
  avatarUrl?: string;
  vibeEmojis?: string[];
  latitude?: number;
  longitude?: number;
  hometown?: string;
  loading?: boolean;
}

const UserDetailsSheetComponent = forwardRef<
  BottomSheet,
  UserDetailsSheetProps
>(
  (
    {
      fullName,
      avatarUrl,
      vibeEmojis,
      latitude,
      longitude,
      hometown,
      loading = false,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => ["50%"], []);
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
          const result = await reverseGeocode(longitude, latitude, (freshData) => {
            // Update with fresh data if cache was stale
            setHumanReadableLocation(freshData.formattedAddress);
          });
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

    // Show basic info immediately, even while loading additional data
    const showBasicInfo = fullName && !loading;

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          {!showBasicInfo ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.hex.purple600} />
            </View>
          ) : (
            <>
              {/* Avatar or Initials Circle */}
              <View style={styles.avatarContainer}>
                <Avatar fullName={fullName} avatarUrl={avatarUrl} />
              </View>

              {/* Full Name */}
              <Text style={styles.fullName}>{fullName}</Text>

              {/* Vibe (Emojis) - show loading state if still loading */}
              {loading ? (
                <View style={styles.vibeContainer}>
                  <ActivityIndicator
                    size="small"
                    color={colors.hex.purple600}
                  />
                </View>
              ) : (
                vibeEmojis &&
                vibeEmojis.length > 0 && (
                  <View style={styles.vibeContainer}>
                    <Text style={styles.vibeLabel}>Vibe</Text>
                    <View style={styles.emojiGrid}>
                      {countEmojis(vibeEmojis).map(([emoji, count]) => (
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
                  </View>
                )
              )}

              {/* Current Location */}
              {(latitude !== undefined || longitude !== undefined) && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Current Location</Text>
                  {geocoding ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.hex.purple600}
                    />
                  ) : (
                    <Text style={styles.infoValue}>
                      {humanReadableLocation || "Unknown location"}
                    </Text>
                  )}
                </View>
              )}

              {/* Hometown - show loading state if still loading */}
              {loading && !hometown ? (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Hometown</Text>
                  <ActivityIndicator
                    size="small"
                    color={colors.hex.purple600}
                  />
                </View>
              ) : (
                hometown && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Hometown</Text>
                    <Text style={styles.infoValue}>{hometown}</Text>
                  </View>
                )
              )}
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

// Memoize the component to prevent unnecessary re-renders
export const UserDetailsSheet = React.memo(
  UserDetailsSheetComponent,
  (prevProps, nextProps) => {
    // Only re-render if relevant props change
    return (
      prevProps.userId === nextProps.userId &&
      prevProps.fullName === nextProps.fullName &&
      prevProps.avatarUrl === nextProps.avatarUrl &&
      prevProps.latitude === nextProps.latitude &&
      prevProps.longitude === nextProps.longitude &&
      prevProps.hometown === nextProps.hometown &&
      prevProps.loading === nextProps.loading &&
      JSON.stringify(prevProps.vibeEmojis) === JSON.stringify(nextProps.vibeEmojis)
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
  },
  vibeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.hex.placeholder,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
  infoRow: {
    width: "100%",
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.hex.placeholder,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.hex.purple900,
  },
});
