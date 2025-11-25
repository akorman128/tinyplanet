import React from "react";
import { View } from "react-native";
import { Body } from "./Typography";

export interface ErrorStateProps {
  message: string;
  className?: string;
}

export const ErrorState = React.memo<ErrorStateProps>(
  ({ message, className }) => {
    return (
      <View className={`flex-1 justify-center items-center px-6 ${className || ""}`}>
        <Body className="text-center text-red-500">{message}</Body>
      </View>
    );
  }
);

ErrorState.displayName = "ErrorState";
