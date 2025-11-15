import React, { useState, useEffect, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import Mapbox, { Camera, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { useFriends } from "@/hooks/useFriends";
import { GeoJSONFeatureCollection } from "@/types/friendship";
import { useLocation } from "@/hooks/useLocation";

interface MapViewProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const MapView: React.FC<MapViewProps> = React.memo(
  ({ onRefresh, refreshing = false }) => {
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
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Convert user location object to [longitude, latitude] tuple for Mapbox

    const handleUserLocation = async () => {
      if (!userLocationObj) {
        const coords = await getCurrentLocation();

        return [coords.longitude, coords.latitude];
      }
      return [userLocationObj.longitude, userLocationObj.latitude];
    };

    if (!userLocationObj) {
      await getCurrentLocation();
    }
    const userLocation: [number, number] = [
      userLocationObj.longitude,
      userLocationObj.latitude,
    ];

    // Load friend locations
    const loadFriendLocations = useCallback(async () => {
      try {
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
      }
    }, [getFriendLocations, updateLocationInDatabase, getCurrentLocation]);

    // Initial load
    useEffect(() => {
      const initialLoad = async () => {
        setLoading(true);
        await loadFriendLocations();
        setLoading(false);
      };
      initialLoad();
    }, []);

    // Handle refresh
    useEffect(() => {
      if (refreshing && !isRefreshing) {
        setIsRefreshing(true);
        loadFriendLocations().finally(() => {
          setIsRefreshing(false);
          onRefresh?.();
        });
      }
    }, [refreshing]);

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
          <Camera
            zoomLevel={12}
            centerCoordinate={userLocation}
            animationDuration={1000}
            animationMode="flyTo"
          />

          {/* User location marker */}
          {userLocation && (
            <Mapbox.PointAnnotation
              id="user-location"
              coordinate={userLocation}
            >
              <View style={styles.userMarker} />
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
  }
);

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
    backgroundColor: "#9333ea", // purple-600
    borderWidth: 3,
    borderColor: "#ffffff",
  },
});
