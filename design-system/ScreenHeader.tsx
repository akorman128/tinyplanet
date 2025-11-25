import React from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Body } from "./Typography";
import { Heading } from "./Typography";

export interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
}

export const ScreenHeader = React.memo<ScreenHeaderProps>(
  ({ title, showBackButton = true, onBack, rightComponent }) => {
    const router = useRouter();

    const handleBack = () => {
      if (onBack) {
        onBack();
      } else {
        router.back();
      }
    };

    return (
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-100">
        {showBackButton ? (
          <Pressable onPress={handleBack} className="py-2 pr-3">
            <Body className="text-base font-semibold text-purple-600">
              ← Back
            </Body>
          </Pressable>
        ) : (
          <View className="w-[60px]" />
        )}
        <Heading className="text-xl font-bold">{title}</Heading>
        {rightComponent ? (
          rightComponent
        ) : (
          <View className="w-[60px]" />
        )}
      </View>
    );
  }
);

ScreenHeader.displayName = "ScreenHeader";
