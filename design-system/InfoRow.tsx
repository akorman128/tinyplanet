import React, { ReactNode } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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
    <View style={[styles.container, className ? { className } : null]}>
      <Text style={styles.label}>{label}</Text>
      {loading ? (
        <ActivityIndicator size="small" color={colors.hex.purple600} />
      ) : (
        <>
          {typeof value === "string" ? (
            <Text style={styles.value}>{value}</Text>
          ) : (
            value
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.hex.placeholder,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.hex.purple900,
  },
});
