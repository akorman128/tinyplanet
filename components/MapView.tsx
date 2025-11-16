import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  LayoutChangeEvent,
} from "react-native";
import Mapbox, {
  Camera,
  ShapeSource,
  CircleLayer,
  SymbolLayer,
} from "@rnmapbox/maps";
import { useFriends } from "@/hooks/useFriends";
import { GeoJSONFeatureCollection } from "@/types/friendship";
import { useLocation } from "@/hooks/useLocation";
import { colors } from "@/design-system";

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
    } = useLocation();

    const [friendLocations, setFriendLocations] =
      useState<GeoJSONFeatureCollection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

    // Convert user location object to [longitude, latitude] tuple for Mapbox
    const userLocation: [number, number] | null = userLocationObj
      ? [userLocationObj.longitude, userLocationObj.latitude]
      : null;

    // Load friend locations with smart caching
    const loadFriendLocations = useCallback(
      async (forceRefresh: boolean = false) => {
        try {
          setError(null);

          // Get user's current location (uses cache if not stale, unless forcing refresh)
          await getCurrentLocation(forceRefresh);

          // Update user's location in the database (applies distance threshold internally)
          await updateLocationInDatabase(forceRefresh);

          // Fetch friend and mutual locations
          const locations = await getFriendLocations();
          setFriendLocations(locations);
        } catch (err) {
          console.error("Error loading friend locations:", err);
          const errorMessage = err instanceof Error ? err.message : String(err);
          setError(errorMessage);
        }
      },
      [getFriendLocations, updateLocationInDatabase, getCurrentLocation]
    );

    // Initial load
    useEffect(() => {
      const initialLoad = async () => {
        setLoading(true);
        await loadFriendLocations();
        setLoading(false);
      };
      initialLoad();
    }, []);

    // Handle manual refresh - force fresh location
    useEffect(() => {
      if (refreshing && !isRefreshing) {
        setIsRefreshing(true);
        loadFriendLocations(true).finally(() => {
          setIsRefreshing(false);
          onRefresh?.();
        });
      }
    }, [refreshing, isRefreshing, loadFriendLocations, onRefresh]);

    // Handle layout to ensure map has proper dimensions
    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setMapDimensions({ width, height });
    }, []);

    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.hex.purple600} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container} onLayout={handleLayout}>
        {mapDimensions.width > 0 && mapDimensions.height > 0 && (
          <Mapbox.MapView
            style={styles.map}
            // styleURL="mapbox://styles/mapbox/light-v11"
            styleURL={Mapbox.StyleURL.Street}
            compassViewPosition={3}
            scaleBarEnabled={false}
          >
            <Camera
              zoomLevel={12}
              centerCoordinate={userLocation || [0, 0]}
              animationDuration={1000}
              animationMode="flyTo"
            />

            {/* User location marker */}
            {userLocation && (
              <ShapeSource
                id="user-location"
                shape={{
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: userLocation,
                  },
                  properties: {
                    name: "You",
                  },
                }}
              >
                <CircleLayer
                  id="user-marker"
                  style={{
                    circleRadius: 10,
                    circleColor: "#53d769",
                    circleOpacity: 0.85,
                    circleStrokeWidth: 3,
                    circleStrokeColor: colors.hex.white,
                  }}
                />
                {/* Center dot for user marker */}
                <CircleLayer
                  id="user-marker-center"
                  style={{
                    circleRadius: 3,
                    circleColor: colors.hex.white,
                  }}
                />
                {/* User location label */}
                <SymbolLayer
                  id="user-label"
                  style={{
                    textField: ["get", "name"],
                    textSize: 12,
                    textColor: "#53d769",
                    textHaloColor: colors.hex.white,
                    textHaloWidth: 2,
                    textOffset: [0, 1.5],
                    textAnchor: "top",
                    textFont: [
                      "Roboto Medium",
                      "Noto Sans Regular",
                      "Arial Unicode MS Regular",
                    ],
                  }}
                />
              </ShapeSource>
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
                    textColor: colors.hex.white,
                    iconImage: "marker-15",
                    iconSize: 1.5,
                  }}
                />

                {/* Individual friend markers */}
                <CircleLayer
                  id="friend-markers"
                  filter={[
                    "all",
                    ["!has", "point_count"],
                    ["==", "type", "friend"],
                  ]}
                  style={{
                    circleRadius: 10,
                    circleColor: colors.hex.purple600,
                    circleOpacity: 0.85,
                    circleStrokeWidth: 3,
                    circleStrokeColor: colors.hex.white,
                  }}
                />

                {/* Individual mutual markers */}
                <CircleLayer
                  id="mutual-markers"
                  filter={[
                    "all",
                    ["!has", "point_count"],
                    ["==", "type", "mutual"],
                  ]}
                  style={{
                    circleRadius: 10,
                    circleColor: colors.hex.purple200,
                    circleOpacity: 0.85,
                    circleStrokeWidth: 3,
                    circleStrokeColor: colors.hex.white,
                  }}
                />

                {/* Friend name labels */}
                <SymbolLayer
                  id="friend-labels"
                  filter={[
                    "all",
                    ["!has", "point_count"],
                    ["==", "type", "friend"],
                  ]}
                  style={{
                    textField: ["get", "name"],
                    textSize: 12,
                    textColor: colors.hex.purple900,
                    textHaloColor: colors.hex.white,
                    textHaloWidth: 2,
                    textOffset: [0, 1.5],
                    textAnchor: "top",
                    textFont: [
                      "Roboto Medium",
                      "Noto Sans Regular",
                      "Arial Unicode MS Regular",
                    ],
                  }}
                />

                {/* Mutual name labels */}
                <SymbolLayer
                  id="mutual-labels"
                  filter={[
                    "all",
                    ["!has", "point_count"],
                    ["==", "type", "mutual"],
                  ]}
                  style={{
                    textField: ["get", "name"],
                    textSize: 12,
                    textColor: colors.hex.purple800,
                    textHaloColor: colors.hex.white,
                    textHaloWidth: 2,
                    textOffset: [0, 1.5],
                    textAnchor: "top",
                    textFont: [
                      "Roboto Medium",
                      "Noto Sans Regular",
                      "Arial Unicode MS Regular",
                    ],
                  }}
                />
              </ShapeSource>
            )}
          </Mapbox.MapView>
        )}
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
    backgroundColor: colors.hex.white,
  },
  errorText: {
    color: colors.hex.error,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
