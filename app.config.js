export default {
  expo: {
    name: "tinyplanet",
    slug: "tinyplanet",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "expo-supabase-starter",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    platforms: ["ios", "android"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.alexkorman.tinyplanet",
      infoPlist: {
        NSContactsUsageDescription:
          "We need access to your contacts so you can easily invite friends to Tiny Planet.",
        NSLocationWhenInUseUsageDescription:
          "We need your location to show you on the map with your friends.",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "We need your location to show you on the map with your friends.",
        LSApplicationQueriesSchemes: ["instagram", "twitter"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.alexkorman.tinyplanet",
      permissions: [
        "READ_CONTACTS",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
      ],
    },
    plugins: [
      "expo-router",
      "expo-contacts",
      "expo-location",
      [
        "@rnmapbox/maps",
        {
          RNMAPBOX_MAPS_DOWNLOAD_TOKEN:
            process.env.EXPO_PUBLIC_RN_MAPBOX_MAPS_DOWNLOAD_TOKEN,
          RNMapboxMapsImpl: "mapbox",
        },
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    web: {
      bundler: "metro",
    },
  },
};
