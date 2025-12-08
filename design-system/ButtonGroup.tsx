import { View, TouchableOpacity, Text } from "react-native";
import { JSX } from "react";
import { IconProps } from "./Icons";

export interface ButtonGroupOption {
  label?: string;
  icon?: (props: IconProps) => JSX.Element;
  onPress: () => void;
}

interface ButtonGroupProps {
  options: ButtonGroupOption[];
  className?: string;
  activeIndex?: number;
}

export function ButtonGroup({
  options,
  className = "",
  activeIndex,
}: ButtonGroupProps) {
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
      className={`flex-row rounded-2xl border border-gray-600 overflow-hidden shadow-lg ${className}`}
    >
      {options.map((option, index) => {
        const isLast = index === options.length - 1;
        const isActive = activeIndex === index;
        const Icon = option.icon;

        return (
          <TouchableOpacity
            key={index}
            onPress={option.onPress}
            className={`flex-1 py-4 px-6 ${
              isActive ? "bg-purple-600" : "bg-transparent"
            } active:bg-gray-800 ${!isLast ? "border-r border-gray-600" : ""}`}
          >
            <View className="flex-row items-center justify-center gap-2">
              {Icon && <Icon size={20} color="white" />}
              {option.label && (
                <Text className="text-white text-lg font-medium">
                  {option.label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
