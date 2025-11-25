import React, { ReactNode } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { colors } from "./colors";

export interface InfoRowProps {
  label: string;
  value?: string | ReactNode;
  loading?: boolean;
  className?: string;
}

export function InfoRow({
  label,
  value,
  loading = false,
  className = "",
}: InfoRowProps) {
  return (
    <View className={`w-full mb-4 py-4 px-5 bg-gray-50 rounded-xl ${className}`}>
      <Text className="text-xs font-semibold text-[#9ca3af] mb-1.5 uppercase tracking-wide">
        {label}
      </Text>
      {loading ? (
        <ActivityIndicator size="small" color={colors.hex.purple600} />
      ) : (
        <>
          {typeof value === "string" ? (
            <Text className="text-base font-medium text-[#1e1b4b]">{value}</Text>
          ) : (
            value
          )}
        </>
      )}
    </View>
  );
}
