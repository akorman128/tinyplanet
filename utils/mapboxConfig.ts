import Mapbox from "@rnmapbox/maps";

/**
 * Initialize Mapbox with access token.
 * Should be called once at app startup before any map components render.
 */
export function initializeMapbox(): void {
  const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!MAPBOX_ACCESS_TOKEN) {
    console.warn(
      "Mapbox access token not found. Set EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN in your .env file."
    );
    return;
  }

  Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
}
