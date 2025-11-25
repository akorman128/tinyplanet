import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
    <View className="flex-1">
      <MapView onRefresh={onRefreshComplete} refreshing={refreshing} />
      <TouchableOpacity
        className="absolute left-5 w-12 h-12 rounded-full justify-center items-center"
        style={{
          top: insets.top + 20,
          backgroundColor: colors.hex.white,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={handleProfilePress}
      >
        <Avatar
          fullName={profileState?.full_name || ""}
          avatarUrl={profileState?.avatar_url}
          size="small"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute right-5 w-12 h-12 rounded-full bg-white opacity-70 justify-center items-center"
        style={{
          top: insets.top + 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={handleSearchPress}
      >
        <Icons.search size={64} color="black" />
      </TouchableOpacity>
    </View>
  );
}
