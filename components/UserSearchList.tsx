import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "@/design-system";
import { FriendWithRelationship } from "@/types/friendship";

type UserSearchListItemProps = {
  user: FriendWithRelationship;
  onAddFriend?: (userId: string) => void;
};

export function UserSearchListItem({
  user,
  onAddFriend,
}: UserSearchListItemProps) {
  const isFriend = user.relationship === "friend";

  return (
    <View className="flex-row items-center px-6 py-4">
      <Avatar
        fullName={user.full_name}
        avatarUrl={user.avatar_url || undefined}
        size="small"
      />
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-purple-900 mb-1">
          {user.full_name}
        </Text>
        <View className="flex-row items-center gap-2">
          {user.hometown && (
            <Text className="text-sm text-gray-400">{user.hometown}</Text>
          )}
          <View
            className={`py-0.5 px-2 rounded ${
              isFriend ? "bg-purple-200" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                isFriend ? "text-purple-700" : "text-gray-400"
              }`}
            >
              {isFriend ? "Friend" : "Mutual"}
            </Text>
          </View>
        </View>
      </View>
      {!isFriend && (
        <TouchableOpacity
          className="py-2 px-5 bg-purple-600 rounded-lg"
          onPress={() => onAddFriend?.(user.id)}
        >
          <Text className="text-sm font-semibold text-white">Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
