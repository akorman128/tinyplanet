import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/design-system/colors";

export type Tab = {
  id: string;
  label: string;
};

type TabBarProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
};

export function TabBar({ tabs, activeTab, onTabChange, className = "" }: TabBarProps) {
  return (
    <View className={`flex-row bg-white border-b border-[#f0f0f0] ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            className={`flex-1 py-4 items-center justify-center border-b-2 ${
              isActive ? "border-purple-600" : "border-transparent"
            }`}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              className="text-sm font-semibold"
              style={{
                color: isActive ? colors.hex.purple600 : colors.hex.placeholder,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
