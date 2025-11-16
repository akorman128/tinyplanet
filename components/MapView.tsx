import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  LayoutChangeEvent,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Mapbox, {
  Camera,
  ShapeSource,
  CircleLayer,
  SymbolLayer,
} from "@rnmapbox/maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFriends } from "@/hooks/useFriends";
import { GeoJSONFeatureCollection } from "@/types/friendship";
import { useLocation } from "@/hooks/useLocation";
import { colors } from "@/design-system";
import { UserDetailsSheet } from "./UserDetailsSheet";
import { useProfile } from "@/hooks/useProfile";
import { useVibe } from "@/hooks/useVibe";
import { reverseGeocode } from "@/utils/reverseGeocode";

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
    const { getProfile } = useProfile();
    const { getVibes } = useVibe();

    const [friendLocations, setFriendLocations] =
      useState<GeoJSONFeatureCollection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

    // Bottom sheet state
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedUser, setSelectedUser] = useState<{
      id: string;
      fullName: string;
      avatarUrl?: string;
      vibeEmojis?: string[];
      latitude?: number;
      longitude?: number;
      hometown?: string;
    } | null>(null);
    const [sheetLoading, setSheetLoading] = useState(false);

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

    // Handle marker press
    const handleMarkerPress = useCallback(
      async (event: any) => {
        const markerPressTime = Date.now();
        console.log("\n[MapView] ========== MARKER PRESS ==========");

        const { features } = event;
        if (features && features.length > 0) {
          const feature = features[0];
          const userId = feature.properties.id;
          const userName = feature.properties.name;

          // Don't do anything if a cluster is tapped
          if (feature.properties.point_count) {
            return;
          }

          // Get coordinates from the feature (GeoJSON coordinates are [longitude, latitude])
          const [longitude, latitude] = feature.geometry.coordinates;

          console.log(`[MapView] User: ${userName} (${userId})`);
          console.log(`[MapView] Coordinates: (${longitude}, ${latitude})`);

          // Show basic info immediately
          const sheetOpenTime = Date.now();
          setSelectedUser({
            id: userId,
            fullName: userName,
            latitude,
            longitude,
          });
          setSheetLoading(true);
          bottomSheetRef.current?.snapToIndex(0);
          const sheetOpenDuration = Date.now() - sheetOpenTime;
          console.log(`[MapView] Sheet opened in ${sheetOpenDuration}ms`);

          try {
            // Fetch user profile, vibes, and geocoding in parallel
            console.log("[MapView] Starting parallel fetch for profile, vibes, and geocoding");
            const parallelFetchStart = Date.now();

            // Start all requests with individual timing
            const profileStart = Date.now();
            const profilePromise = getProfile({ userId })
              .then((result) => {
                const profileDuration = Date.now() - profileStart;
                console.log(`[MapView] Profile fetch completed in ${profileDuration}ms`);
                return result;
              })
              .catch((err) => {
                const profileDuration = Date.now() - profileStart;
                console.error(`[MapView] Profile fetch FAILED after ${profileDuration}ms:`, err);
                throw err;
              });

            const vibesStart = Date.now();
            const vibesPromise = getVibes({ recipientId: userId })
              .then((result) => {
                const vibesDuration = Date.now() - vibesStart;
                console.log(`[MapView] Vibes fetch completed in ${vibesDuration}ms`);
                return result;
              })
              .catch((err) => {
                const vibesDuration = Date.now() - vibesStart;
                console.error(`[MapView] Vibes fetch FAILED after ${vibesDuration}ms:`, err);
                throw err;
              });

            const geocodePromise = reverseGeocode(longitude, latitude).catch((err) => {
              console.error("[MapView] Geocoding prefetch error:", err);
            });

            const [profile, vibesResult] = await Promise.all([
              profilePromise,
              vibesPromise,
              geocodePromise,
            ]);

            const parallelFetchDuration = Date.now() - parallelFetchStart;
            console.log(`[MapView] Parallel fetch completed in ${parallelFetchDuration}ms (total wall time)`);

            // Get all emojis from vibes (flatten the array of emoji arrays)
            const allEmojis = vibesResult.data.flatMap((vibe) => vibe.emojis);

            // Update with complete data
            setSelectedUser({
              id: userId,
              fullName: profile.full_name,
              avatarUrl: profile.avatar_url,
              vibeEmojis: allEmojis.length > 0 ? allEmojis : undefined,
              latitude,
              longitude,
              hometown: profile.hometown,
            });

            const totalTime = Date.now() - markerPressTime;
            console.log(`[MapView] ========== TOTAL TIME: ${totalTime}ms ==========\n`);
          } catch (err) {
            console.error("Error loading user details:", err);
            const totalTime = Date.now() - markerPressTime;
            console.log(`[MapView] ========== FAILED after ${totalTime}ms ==========\n`);
          } finally {
            setSheetLoading(false);
          }
        }
      },
      [getProfile, getVibes]
    );

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
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container} onLayout={handleLayout}>
          {mapDimensions.width > 0 && mapDimensions.height > 0 && (
            <Mapbox.MapView
              style={styles.map}
              styleURL="mapbox://styles/mapbox/navigation-day-v1"
              // styleURL={Mapbox.StyleURL.Street}
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
                  onPress={handleMarkerPress}
                >
                  {/* Clustered points */}
                  <CircleLayer
                    id="cluster-circles"
                    filter={["has", "point_count"]}
                    style={{
                      circleRadius: [
                        "step",
                        ["get", "point_count"],
                        20, // radius for clusters with < 10 points
                        10,
                        20, // radius for clusters with 10-100 points
                        100,
                        20, // radius for clusters with > 100 points
                      ],
                      circleColor: colors.hex.purple600,
                      circleOpacity: 0.9,
                      circleStrokeWidth: 3,
                      circleStrokeColor: colors.hex.white,
                    }}
                  />
                  <SymbolLayer
                    id="cluster-count"
                    filter={["has", "point_count"]}
                    style={{
                      textField: ["get", "point_count_abbreviated"],
                      textSize: 14,
                      textColor: colors.hex.white,
                      textFont: [
                        "Roboto Bold",
                        "Noto Sans Bold",
                        "Arial Unicode MS Bold",
                      ],
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

          {/* User Details Bottom Sheet */}
          {selectedUser && (
            <UserDetailsSheet
              ref={bottomSheetRef}
              userId={selectedUser.id}
              fullName={selectedUser.fullName}
              avatarUrl={selectedUser.avatarUrl}
              vibeEmojis={selectedUser.vibeEmojis}
              latitude={selectedUser.latitude}
              longitude={selectedUser.longitude}
              hometown={selectedUser.hometown}
              loading={sheetLoading}
            />
          )}
        </View>
      </GestureHandlerRootView>
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
