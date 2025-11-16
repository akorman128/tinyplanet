import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "./colors";
import { getInitials } from "@/utils";

export interface AvatarProps {
  fullName: string;
  avatarUrl?: string;
  size?: "small" | "medium" | "large";
}

const sizeConfig = {
  small: {
    container: 40,
    fontSize: 16,
  },
  medium: {
    container: 60,
    fontSize: 24,
  },
  large: {
    container: 80,
    fontSize: 32,
  },
};

export const Avatar: React.FC<AvatarProps> = React.memo(
  ({ fullName, avatarUrl, size = "large" }) => {
    const config = sizeConfig[size];
    const initials = getInitials(fullName);

    return (
      <View
        style={[
          styles.avatarPlaceholder,
          {
            width: config.container,
            height: config.container,
            borderRadius: config.container / 2,
          },
        ]}
      >
        <Text style={[styles.avatarText, { fontSize: config.fontSize }]}>
          {initials}
        </Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if fullName, avatarUrl, or size changes
    return (
      prevProps.fullName === nextProps.fullName &&
      prevProps.avatarUrl === nextProps.avatarUrl &&
      prevProps.size === nextProps.size
    );
  }
);

const styles = StyleSheet.create({
  avatarPlaceholder: {
    backgroundColor: colors.hex.purple200,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "600",
    color: colors.hex.purple800,
  },
});
