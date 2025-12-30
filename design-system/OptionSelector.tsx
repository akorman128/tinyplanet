import { View, Text, Pressable } from "react-native";
import { JSX } from "react";
import { IconProps } from "./Icons";
import { colors } from "./colors";

export interface OptionSelectorOption<T extends string> {
  value: T;
  label: string;
  icon?: (props: IconProps) => JSX.Element;
}

export interface OptionSelectorProps<T extends string> {
  label?: string;
  options: OptionSelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function OptionSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: OptionSelectorProps<T>) {
  return (
    <View className={className}>
      {label && (
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <View className="flex-row gap-2">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          return (
            <Pressable
              key={option.value}
              className={`flex-1 py-3 rounded-xl border-2 flex-row justify-center items-center ${
                isSelected
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-300 bg-white"
              }`}
              onPress={() => onChange(option.value)}
            >
              {Icon && (
                <Icon
                  size={16}
                  color={isSelected ? colors.hex.purple600 : colors.hex.gray500}
                />
              )}
              <Text
                className={`${Icon ? "ml-1" : ""} text-sm font-medium ${
                  isSelected ? "text-purple-600" : "text-gray-600"
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

