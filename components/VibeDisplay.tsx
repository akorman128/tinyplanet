import React from "react";
import { View, Text, Pressable } from "react-native";
import { colors } from "@/design-system";
import { countEmojis } from "@/utils";

interface VibeDisplayProps {
  vibeEmojis: string[];
  totalVibeCount?: number;
  onPress?: () => void;
  maxDisplay?: number;
}

export const VibeDisplay: React.FC<VibeDisplayProps> = ({
  vibeEmojis,
  totalVibeCount,
  onPress,
  maxDisplay = 6,
}) => {
  if (!vibeEmojis || vibeEmojis.length === 0) {
    return null;
  }

  const content = (
    <>
      <Text
        className="text-sm font-semibold uppercase mb-2"
        style={{ color: colors.hex.placeholder, letterSpacing: 0.5 }}
      >
        Vibe ({totalVibeCount && totalVibeCount > 10 ? "10+" : totalVibeCount})
      </Text>
      <View className="flex-row flex-wrap gap-4 justify-center">
        {countEmojis(vibeEmojis)
          .slice(0, maxDisplay)
          .map(([emoji, count]) => (
            <View key={emoji} className="relative">
              <Text className="text-[32px]">{emoji}</Text>
              {count > 1 && (
                <View
                  className="absolute -top-1 -right-1 rounded-full min-w-[20px] h-5 justify-center items-center px-1.5"
                  style={{ backgroundColor: colors.hex.purple600 }}
                >
                  <Text className="text-xs font-bold text-white">
                    {count}
                  </Text>
                </View>
              )}
            </View>
          ))}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable className="mb-6 items-center w-full" onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return <View className="mb-6 items-center w-full">{content}</View>;
};
