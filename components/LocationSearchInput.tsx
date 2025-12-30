import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { colors } from "@/design-system";

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface LocationResult {
  id: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
}

export interface LocationSearchValue {
  name: string;
  latitude: number;
  longitude: number;
}

interface LocationSearchInputProps {
  label?: string;
  value?: LocationSearchValue | null;
  onChange: (value: LocationSearchValue | null) => void;
  error?: string;
  placeholder?: string;
}

export function LocationSearchInput({
  label,
  value,
  onChange,
  error,
  placeholder = "Search for a destination...",
}: LocationSearchInputProps) {
  const [query, setQuery] = useState(value?.name || "");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query === value?.name) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new debounce timeout
    debounceTimeout.current = setTimeout(async () => {
      await searchLocations(query);
    }, 400); // 400ms debounce

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const searchLocations = async (searchQuery: string) => {
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error("Mapbox access token not configured");
      return;
    }

    setIsLoading(true);
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery
      )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place&limit=5`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const locations: LocationResult[] = data.features.map(
          (feature: any) => ({
            id: feature.id,
            place_name: feature.place_name,
            center: feature.center,
          })
        );
        setResults(locations);
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    } catch (err) {
      console.error("Error searching locations:", err);
      setResults([]);
      setShowDropdown(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location: LocationResult) => {
    setQuery(location.place_name);
    setShowDropdown(false);
    onChange({
      name: location.place_name,
      longitude: location.center[0],
      latitude: location.center[1],
    });
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      onChange(null);
      setResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>

      <View className="relative">
        <TextInput
          value={query}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          className={`bg-white border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg px-4 py-3 text-base`}
          placeholderTextColor={colors.hex.gray500}
          autoCapitalize="words"
          autoCorrect={false}
        />

        {isLoading && (
          <View className="absolute right-4 top-3">
            <Text className="text-gray-500 text-sm">Searching...</Text>
          </View>
        )}

        {/* Dropdown results */}
        {showDropdown && results.length > 0 && (
          <View className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <ScrollView
              style={{ maxHeight: 200 }}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {results.map((item) => (
                <Pressable
                  key={item.id}
                  className="px-4 py-3 border-b border-gray-100"
                  onPress={() => handleSelectLocation(item)}
                >
                  <Text className="text-base text-gray-900">
                    {item.place_name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
