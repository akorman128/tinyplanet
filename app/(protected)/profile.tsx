import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
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
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.hex.purple600} />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
          <Text style={styles.title}>My Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Avatar
              fullName={profileState.full_name}
              avatarUrl={profileState.avatar_url}
              size="large"
            />
          </View>

          {/* Full Name */}
          <Text style={styles.fullName}>{profileState.full_name}</Text>

          {/* Info Sections */}
          <View style={styles.infoSection}>
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
          <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.hex.white,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.hex.purple600,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.hex.purple900,
  },
  headerSpacer: {
    width: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  fullName: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.hex.purple900,
    marginBottom: 32,
    textAlign: "center",
  },
  infoSection: {
    width: "100%",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 8,
  },
});
