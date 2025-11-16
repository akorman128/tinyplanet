/**
 * Reverse geocoding utility using Mapbox Geocoding API
 * Converts coordinates to human-readable location names
 */

import { geocodeCache } from "./geocodeCache";

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface ReverseGeocodeResult {
  city?: string;
  region?: string;
  country?: string;
  formattedAddress: string;
}

/**
 * Converts a PostGIS POINT string to coordinates
 * @param pointString - PostGIS POINT format: "POINT(longitude latitude)"
 * @returns Tuple of [longitude, latitude] or null
 */
export const parsePostGISPoint = (
  pointString: string
): [number, number] | null => {
  const match = pointString.match(/POINT\(([^ ]+) ([^ ]+)\)/);
  if (!match) return null;

  const longitude = parseFloat(match[1]);
  const latitude = parseFloat(match[2]);

  if (isNaN(longitude) || isNaN(latitude)) return null;

  return [longitude, latitude];
};

/**
 * Fetches fresh geocoding data from Mapbox API
 */
const fetchGeocodeData = async (
  longitude: number,
  latitude: number
): Promise<ReverseGeocodeResult> => {
  const startTime = Date.now();
  console.log(`[Geocode] Starting fetch for (${longitude}, ${latitude})`);

  if (!MAPBOX_ACCESS_TOKEN) {
    throw new Error("Mapbox access token not configured");
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place,region,country`;

  const fetchStartTime = Date.now();
  const response = await fetch(url);
  const fetchDuration = Date.now() - fetchStartTime;
  console.log(`[Geocode] Fetch completed in ${fetchDuration}ms`);

  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.statusText}`);
  }

  const parseStartTime = Date.now();
  const data = await response.json();
  const parseDuration = Date.now() - parseStartTime;
  console.log(`[Geocode] JSON parsing completed in ${parseDuration}ms`);

  if (!data.features || data.features.length === 0) {
    const totalDuration = Date.now() - startTime;
    console.log(`[Geocode] Total duration: ${totalDuration}ms (no features found)`);
    return {
      formattedAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    };
  }

  // Extract place components
  let city: string | undefined;
  let region: string | undefined;
  let country: string | undefined;

  for (const feature of data.features) {
    const placeType = feature.place_type?.[0];

    if (placeType === "place" && !city) {
      city = feature.text;
    } else if (placeType === "region" && !region) {
      region = feature.text;
    } else if (placeType === "country" && !country) {
      country = feature.text;
    }
  }

  // Build formatted address
  const parts = [city, region, country].filter(Boolean);
  const formattedAddress =
    parts.length > 0
      ? parts.join(", ")
      : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

  const totalDuration = Date.now() - startTime;
  console.log(`[Geocode] Total duration: ${totalDuration}ms - Result: ${formattedAddress}`);

  return {
    city,
    region,
    country,
    formattedAddress,
  };
};

/**
 * Reverse geocode coordinates to a human-readable location
 * Uses stale-while-revalidate caching for instant results
 * @param longitude - Longitude coordinate
 * @param latitude - Latitude coordinate
 * @param onRevalidate - Optional callback when fresh data is fetched (for stale cache updates)
 * @returns Human-readable location string
 */
export const reverseGeocode = async (
  longitude: number,
  latitude: number,
  onRevalidate?: (result: ReverseGeocodeResult) => void
): Promise<ReverseGeocodeResult> => {
  const reverseGeocodeStartTime = Date.now();

  // Check cache first
  const cached = geocodeCache.get(longitude, latitude);

  if (cached) {
    console.log(`[Geocode] Cache HIT for (${longitude}, ${latitude}) - ${cached.isStale ? 'STALE' : 'FRESH'}`);

    // Return cached data immediately
    const cachedResult: ReverseGeocodeResult = {
      formattedAddress: cached.data,
    };

    // If stale, fetch fresh data in background
    if (cached.isStale && onRevalidate) {
      console.log(`[Geocode] Revalidating stale cache in background`);
      fetchGeocodeData(longitude, latitude)
        .then((freshResult) => {
          geocodeCache.set(longitude, latitude, freshResult.formattedAddress);
          onRevalidate(freshResult);
        })
        .catch((error) => {
          console.error("[Geocode] Background revalidation error:", error);
        });
    }

    const duration = Date.now() - reverseGeocodeStartTime;
    console.log(`[Geocode] reverseGeocode completed in ${duration}ms (from cache)`);
    return cachedResult;
  }

  console.log(`[Geocode] Cache MISS for (${longitude}, ${latitude}) - fetching from API`);

  // Cache miss - fetch fresh data
  try {
    const result = await fetchGeocodeData(longitude, latitude);
    geocodeCache.set(longitude, latitude, result.formattedAddress);
    const duration = Date.now() - reverseGeocodeStartTime;
    console.log(`[Geocode] reverseGeocode completed in ${duration}ms (from API)`);
    return result;
  } catch (error) {
    console.error("[Geocode] Reverse geocoding error:", error);
    // Fallback to coordinates
    return {
      formattedAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    };
  }
};

/**
 * Reverse geocode a PostGIS POINT string to a human-readable location
 * @param pointString - PostGIS POINT format: "POINT(longitude latitude)"
 * @returns Human-readable location string
 */
export const reverseGeocodePoint = async (
  pointString: string
): Promise<string> => {
  const coords = parsePostGISPoint(pointString);

  if (!coords) {
    return "Unknown location";
  }

  const [longitude, latitude] = coords;
  const result = await reverseGeocode(longitude, latitude);

  return result.formattedAddress;
};
