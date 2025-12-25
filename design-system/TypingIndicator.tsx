import React, { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";

interface TypingIndicatorProps {
  friendName: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  friendName,
}) => {
  const [dot1] = useState(new Animated.Value(0));
  const [dot2] = useState(new Animated.Value(0));
  const [dot3] = useState(new Animated.Value(0));

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, [dot1, dot2, dot3]);

  return (
    <View className="mb-3 items-start">
      <View className="bg-gray-200 rounded-2xl px-4 py-3 flex-row items-center gap-1">
        <Animated.View
          className="w-2 h-2 rounded-full bg-gray-500"
          style={{ opacity: dot1 }}
        />
        <Animated.View
          className="w-2 h-2 rounded-full bg-gray-500"
          style={{ opacity: dot2 }}
        />
        <Animated.View
          className="w-2 h-2 rounded-full bg-gray-500"
          style={{ opacity: dot3 }}
        />
      </View>
      <Text className="text-xs text-gray-500 mt-1 px-1">
        {friendName} is typing...
      </Text>
    </View>
  );
};
