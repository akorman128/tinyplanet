import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MapView } from "@/components/MapView";
import { Avatar, Icons } from "@/design-system";
import { useProfileStore } from "@/stores/profileStore";
import { colors } from "@/design-system/colors";

export default function Page() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { profileState } = useProfileStore();

  const handleRefresh = () => {
    setRefreshing(true);
  };

  const onRefreshComplete = () => {
    setRefreshing(false);
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleSearchPress = () => {
    router.push("/search");
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView onRefresh={onRefreshComplete} refreshing={refreshing} />
      <TouchableOpacity
        style={[pageStyles.profileButton, { top: insets.top + 20 }]}
        onPress={handleProfilePress}
      >
        <Avatar
          fullName={profileState?.full_name || ""}
          avatarUrl={profileState?.avatar_url}
          size="small"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[pageStyles.searchButton, { top: insets.top + 20 }]}
        onPress={handleSearchPress}
      >
        <Icons.search size={64} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const pageStyles = StyleSheet.create({
  profileButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.hex.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
