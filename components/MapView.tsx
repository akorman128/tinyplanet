import React, { useState, useEffect, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import Mapbox, { Camera, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { useFriends } from "@/hooks/useFriends";
import { GeoJSONFeatureCollection } from "@/types/friendship";
import { useLocation } from "@/hooks/useLocation";

// Set Mapbox access token
const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (MAPBOX_ACCESS_TOKEN) {
  Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
}

interface MapViewProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  onRefresh,
  refreshing = false,
}) => {
  const { getFriendLocations } = useFriends();
  const {
    location: userLocationObj,
    getCurrentLocation,
    updateLocationInDatabase,
    error: locationError,
  } = useLocation();

  const [friendLocations, setFriendLocations] =
    useState<GeoJSONFeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert user location object to [longitude, latitude] tuple for Mapbox
  const userLocation: [number, number] | null = userLocationObj
    ? [userLocationObj.longitude, userLocationObj.latitude]
    : null;

  // Load friend locations
  const loadFriendLocations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user's current location
      await getCurrentLocation();

      // Update user's location in the database
      await updateLocationInDatabase();

      // Fetch friend and mutual locations
      const locations = await getFriendLocations();
      setFriendLocations(locations);
    } catch (err) {
      console.error("Error loading friend locations:", err);
    } finally {
      setLoading(false);
    }
  }, [getFriendLocations, updateLocationInDatabase, getCurrentLocation]);

  // Initial load
  useEffect(() => {
    loadFriendLocations();
  }, [loadFriendLocations]);

  // Handle refresh
  useEffect(() => {
    if (refreshing) {
      loadFriendLocations().then(() => {
        onRefresh?.();
      });
    }
  }, [refreshing, loadFriendLocations, onRefresh]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  if (error || locationError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || locationError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.Street}
        compassViewPosition={3}
        scaleBarEnabled={false}
      >
        {userLocation && (
          <Camera
            zoomLevel={12}
            centerCoordinate={userLocation}
            animationDuration={1000}
          />
        )}

        {/* User location marker */}
        {userLocation && (
          <Mapbox.PointAnnotation id="user-location" coordinate={userLocation}>
            <View style={styles.userMarker}>
              <View style={styles.userMarkerInner} />
            </View>
          </Mapbox.PointAnnotation>
        )}

        {/* Friend and mutual markers with clustering */}
        {friendLocations && friendLocations.features.length > 0 && (
          <ShapeSource
            id="friend-locations"
            shape={friendLocations}
            cluster
            clusterRadius={50}
            clusterMaxZoomLevel={14}
          >
            {/* Clustered points */}
            <SymbolLayer
              id="clusters"
              filter={["has", "point_count"]}
              style={{
                textField: ["get", "point_count"],
                textSize: 14,
                textColor: "#ffffff",
                iconImage: "marker-15",
                iconSize: 1.5,
              }}
            />

            {/* Individual friend markers */}
            <SymbolLayer
              id="friend-markers"
              filter={[
                "all",
                ["!has", "point_count"],
                ["==", "type", "friend"],
              ]}
              style={{
                iconImage: "marker-15",
                iconSize: 1.2,
                iconColor: "#9333ea", // purple-600
                textField: ["get", "name"],
                textSize: 12,
                textColor: "#111827", // gray-900
                textOffset: [0, 1.5],
                textAnchor: "top",
              }}
            />

            {/* Individual mutual markers */}
            <SymbolLayer
              id="mutual-markers"
              filter={[
                "all",
                ["!has", "point_count"],
                ["==", "type", "mutual"],
              ]}
              style={{
                iconImage: "marker-15",
                iconSize: 1.2,
                iconColor: "#e9d5ff", // purple-200
                textField: ["get", "name"],
                textSize: 12,
                textColor: "#6b7280", // gray-500
                textOffset: [0, 1.5],
                textAnchor: "top",
              }}
            />
          </ShapeSource>
        )}
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: "#ef4444", // red-500
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  userMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#9333ea", // purple-600
    justifyContent: "center",
    alignItems: "center",
  },
  userMarkerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#9333ea", // purple-600
  },
});
