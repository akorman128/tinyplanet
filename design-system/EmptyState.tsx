import React from "react";
import { View } from "react-native";
import { Body } from "./Typography";

export interface EmptyStateProps {
  message: string;
  className?: string;
}

export const EmptyState = React.memo<EmptyStateProps>(
  ({ message, className }) => {
    return (
      <View className={`flex-1 justify-center items-center px-6 ${className || ""}`}>
        <Body className="text-center text-gray-400">{message}</Body>
      </View>
    );
  }
);

EmptyState.displayName = "EmptyState";
