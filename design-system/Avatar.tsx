import React from "react";
import { View, Text } from "react-native";
import { getInitials } from "@/utils";

export interface AvatarProps {
  fullName: string;
  avatarUrl?: string;
  size?: "small" | "medium" | "large";
}

const sizeConfig = {
  small: {
    container: "w-10 h-10",
    fontSize: "text-base",
  },
  medium: {
    container: "w-[60px] h-[60px]",
    fontSize: "text-2xl",
  },
  large: {
    container: "w-20 h-20",
    fontSize: "text-[32px]",
  },
};

export const Avatar = React.memo<AvatarProps>(
  ({ fullName, avatarUrl, size = "large" }) => {
    const config = sizeConfig[size];
    const initials = getInitials(fullName);

    return (
      <View
        className={`${config.container} rounded-full bg-purple-200 justify-center items-center`}
      >
        <Text className={`${config.fontSize} font-semibold text-purple-800`}>
          {initials}
        </Text>
      </View>
    );
  }
);
