import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
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
  LineLayer,
} from "@rnmapbox/maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFriends } from "@/hooks/useFriends";
import { GeoJSONFeatureCollection, ConnectionLine } from "@/types/friendship";
import { useLocation } from "@/hooks/useLocation";
import { colors, MapLegend } from "@/design-system";
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

    // Connection line visibility state (default: off)
    const [showConnectionLines, setShowConnectionLines] = useState(false);

    // Bottom sheet state
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedUser, setSelectedUser] = useState<{
      id: string;
      fullName: string;
      avatarUrl?: string;
      vibeEmojis?: string[];
      totalVibeCount?: number;
      latitude?: number;
      longitude?: number;
      hometown?: string;
      birthday?: string;
    } | null>(null);
    const [sheetLoading, setSheetLoading] = useState(false);
    const [vibesLoading, setVibesLoading] = useState(false);

    // Convert user location object to [longitude, latitude] tuple for Mapbox
    const userLocation: [number, number] | null = userLocationObj
      ? [userLocationObj.longitude, userLocationObj.latitude]
      : null;

    // Calculate connection lines based on friend locations and user location
    const connectionLines = useMemo(() => {
      if (!friendLocations || !userLocation) {
        return { userToFriendLines: [], friendToMutualLines: [] };
      }

      const userToFriendLines: ConnectionLine[] = [];
      const friendToMutualLines: ConnectionLine[] = [];

      // Create a map of friend IDs to their coordinates for quick lookup
      const friendCoordinatesMap = new Map<string, [number, number]>();

      friendLocations.features.forEach((feature) => {
        const { id, type, connecting_friend_id } = feature.properties;
        const coordinates = feature.geometry.coordinates as [number, number];

        if (type === "friend") {
          // Store friend coordinates for later use
          friendCoordinatesMap.set(id, coordinates);

          // Create line from user to friend
          userToFriendLines.push({
            from: { id: "user", coordinates: userLocation },
            to: { id, coordinates },
            type: "user-to-friend",
          });
        } else if (type === "mutual" && connecting_friend_id) {
          // Create line from connecting friend to mutual
          const friendCoords = friendCoordinatesMap.get(connecting_friend_id);
          if (friendCoords) {
            friendToMutualLines.push({
              from: { id: connecting_friend_id, coordinates: friendCoords },
              to: { id, coordinates },
              type: "friend-to-mutual",
            });
          }
        }
      });

      return { userToFriendLines, friendToMutualLines };
    }, [friendLocations, userLocation]);

    // Convert connection lines to GeoJSON LineString format for Mapbox
    const userToFriendLinesGeoJSON = useMemo(() => {
      if (!showConnectionLines) return null;

      return {
        type: "FeatureCollection" as const,
        features: connectionLines.userToFriendLines.map((line) => ({
          type: "Feature" as const,
          geometry: {
            type: "LineString" as const,
            coordinates: [line.from.coordinates, line.to.coordinates],
          },
          properties: {},
        })),
      };
    }, [connectionLines.userToFriendLines, showConnectionLines]);

    const friendToMutualLinesGeoJSON = useMemo(() => {
      if (!showConnectionLines) return null;

      return {
        type: "FeatureCollection" as const,
        features: connectionLines.friendToMutualLines.map((line) => ({
          type: "Feature" as const,
          geometry: {
            type: "LineString" as const,
            coordinates: [line.from.coordinates, line.to.coordinates],
          },
          properties: {},
        })),
      };
    }, [connectionLines.friendToMutualLines, showConnectionLines]);

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

    // Initial load - only run once on mount
    const hasInitiallyLoaded = useRef(false);
    useEffect(() => {
      if (!hasInitiallyLoaded.current) {
        hasInitiallyLoaded.current = true;
        const initialLoad = async () => {
          setLoading(true);
          await loadFriendLocations();
          setLoading(false);
        };
        initialLoad();
      }
    }, [loadFriendLocations]);

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

    // Handle bottom sheet close
    const handleSheetChange = useCallback((index: number) => {
      if (index === -1) {
        // Sheet is closed, clear selected user to show legend
        setSelectedUser(null);
      }
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

          // PHASE 1: Show sheet immediately with marker data (0ms)
          setSelectedUser({
            id: userId,
            fullName: userName,
            latitude,
            longitude,
          });
          setSheetLoading(false);
          setVibesLoading(true);
          bottomSheetRef.current?.snapToIndex(0);

          const sheetOpenTime = Date.now() - markerPressTime;
          console.log(`[MapView] Sheet opened in ${sheetOpenTime}ms`);

          // PHASE 2: Fetch profile data in background (avatar, hometown)
          (async () => {
            try {
              console.log("[MapView] Fetching profile data");
              const profileStart = Date.now();
              const profile = await getProfile({ userId });
              const profileDuration = Date.now() - profileStart;
              console.log(
                `[MapView] Profile fetch completed in ${profileDuration}ms`
              );

              // Update with profile data
              setSelectedUser((prev) => ({
                ...prev!,
                avatarUrl: profile.avatar_url,
                hometown: profile.hometown,
                birthday: profile.birthday,
              }));
            } catch (err) {
              console.error("Error loading profile:", err);
            }
          })();

          // PHASE 3: Fetch vibes data in background (slowest)
          (async () => {
            try {
              console.log("[MapView] Fetching vibes data");
              const vibesStart = Date.now();
              const vibesResult = await getVibes({ recipientId: userId });
              const vibesDuration = Date.now() - vibesStart;
              console.log(
                `[MapView] Vibes fetch completed in ${vibesDuration}ms`
              );

              // Get all emojis from vibes (flatten the array of emoji arrays)
              const allEmojis = vibesResult.data.flatMap((vibe) => vibe.emojis);

              // Update with vibes data
              setSelectedUser((prev) => ({
                ...prev!,
                vibeEmojis: allEmojis.length > 0 ? allEmojis : undefined,
                totalVibeCount: vibesResult.data.length,
              }));

              const totalTime = Date.now() - markerPressTime;
              console.log(
                `[MapView] ========== TOTAL TIME: ${totalTime}ms ==========\n`
              );
            } catch (err) {
              console.error("Error loading vibes:", err);
            } finally {
              setVibesLoading(false);
            }
          })();
        }
      },
      [getProfile, getVibes]
    );

    if (loading) {
      return (
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color={colors.hex.purple600} />
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-error text-base text-center px-6">{error}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1" onLayout={handleLayout}>
          {mapDimensions.width > 0 && mapDimensions.height > 0 && (
            <Mapbox.MapView
              style={styles.map}
              // styleURL="mapbox://styles/mapbox/navigation-day-v1"
              // styleURL={Mapbox.StyleURL.Street}
              styleURL={Mapbox.StyleURL.Dark}
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

              {/* Connection lines: User → Friends */}
              {userToFriendLinesGeoJSON &&
                userToFriendLinesGeoJSON.features.length > 0 && (
                  <ShapeSource
                    id="user-to-friend-lines"
                    shape={userToFriendLinesGeoJSON}
                  >
                    <LineLayer
                      id="user-to-friend-line-layer"
                      style={{
                        lineColor: colors.hex.purple600,
                        lineWidth: 2,
                        lineOpacity: 0.6,
                      }}
                    />
                  </ShapeSource>
                )}

              {/* Connection lines: Friends → Mutuals */}
              {friendToMutualLinesGeoJSON &&
                friendToMutualLinesGeoJSON.features.length > 0 && (
                  <ShapeSource
                    id="friend-to-mutual-lines"
                    shape={friendToMutualLinesGeoJSON}
                  >
                    <LineLayer
                      id="friend-to-mutual-line-layer"
                      style={{
                        lineColor: colors.hex.purple200,
                        lineWidth: 2,
                        lineOpacity: 0.6,
                        lineDasharray: [2, 2],
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

          {selectedUser && (
            <UserDetailsSheet
              ref={bottomSheetRef}
              userId={selectedUser.id}
              fullName={selectedUser.fullName}
              avatarUrl={selectedUser.avatarUrl}
              vibeEmojis={selectedUser.vibeEmojis}
              totalVibeCount={selectedUser.totalVibeCount}
              latitude={selectedUser.latitude}
              longitude={selectedUser.longitude}
              hometown={selectedUser.hometown}
              birthday={selectedUser.birthday}
              loading={sheetLoading}
              vibesLoading={vibesLoading}
              onSheetChange={handleSheetChange}
            />
          )}

          {!selectedUser && (
            <MapLegend
              showLines={showConnectionLines}
              onToggleLines={setShowConnectionLines}
            />
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
