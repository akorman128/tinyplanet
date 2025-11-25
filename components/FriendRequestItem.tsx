import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Badge } from "@/design-system";
import { PendingRequest } from "@/types/friendship";

type FriendRequestItemProps = {
  request: PendingRequest;
  onAccept?: (userId: string) => void;
  onDecline?: (userId: string) => void;
};

export function FriendRequestItem({
  request,
  onAccept,
  onDecline,
}: FriendRequestItemProps) {
  const isIncoming = request.direction === "incoming";

  return (
    <View className="flex-row items-center px-6 py-4">
      <Avatar
        fullName={request.full_name}
        avatarUrl={request.avatar_url || undefined}
        size="small"
      />
      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-purple-900 mb-0.5">
          {request.full_name}
        </Text>
        {request.hometown && (
          <Text className="text-sm text-gray-500">{request.hometown}</Text>
        )}
      </View>
      <View className="flex-row gap-2">
        {isIncoming ? (
          <>
            <TouchableOpacity
              className="py-2 px-4 bg-purple-600 rounded-lg active:bg-purple-700"
              onPress={() => onAccept?.(request.id)}
            >
              <Text className="text-sm font-semibold text-white">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2 px-4 bg-gray-100 rounded-lg active:bg-gray-200"
              onPress={() => onDecline?.(request.id)}
            >
              <Text className="text-sm font-semibold text-gray-500">
                Decline
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Badge variant="default">Pending</Badge>
        )}
      </View>
    </View>
  );
}
