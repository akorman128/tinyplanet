import React from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "./colors";

export interface LoadingStateProps {
  className?: string;
}

export const LoadingState = React.memo<LoadingStateProps>(({ className }) => {
  return (
    <View className={`flex-1 justify-center items-center ${className || ""}`}>
      <ActivityIndicator size="large" color={colors.hex.purple600} />
    </View>
  );
});

LoadingState.displayName = "LoadingState";
