import React from "react";
import { View, Text, Pressable } from "react-native";
import { Avatar, Button, Badge } from "@/design-system";
import { FriendWithRelationship } from "@/types/friendship";

type UserSearchListItemProps = {
  user: FriendWithRelationship;
  onAddFriend?: (userId: string) => void;
  onPress?: (userId: string) => void;
};

export function UserSearchListItem({
  user,
  onAddFriend,
  onPress,
}: UserSearchListItemProps) {
  const isFriend = user.relationship === "friend";

  return (
    <Pressable
      className="flex-row items-center px-6 py-4 active:bg-gray-50"
      onPress={() => onPress?.(user.id)}
    >
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
          <Badge
            size="small"
            variant={isFriend ? "secondary" : "default"}
          >
            {isFriend ? "Friend" : "Mutual"}
          </Badge>
        </View>
      </View>
      {!isFriend && (
        <Button
          variant="primary"
          onPress={() => onAddFriend?.(user.id)}
        >
          Add
        </Button>
      )}
    </Pressable>
  );
}
