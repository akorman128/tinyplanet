import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MapView } from "@/components/MapView";

export default function Page() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
  };

  const onRefreshComplete = () => {
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView onRefresh={onRefreshComplete} refreshing={refreshing} />
      {/* <TouchableOpacity
        style={[pageStyles.refreshButton, { top: insets.top + 20 }]}
        onPress={handleRefresh}
        disabled={refreshing}
      >
        {refreshing ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Ionicons name="refresh" size={24} color="#ffffff" />
        )}
      </TouchableOpacity> */}
    </View>
  );
}

const pageStyles = StyleSheet.create({
  refreshButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#9333ea",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
