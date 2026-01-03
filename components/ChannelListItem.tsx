import { Pressable, View, Text } from "react-native";
import { Avatar, Badge } from "@/design-system";
import { MessageChannel } from "@/types/messageChannel";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

interface ChannelListItemProps {
  channel: MessageChannel;
  currentUserId: string;
  onPress: (friendId: string) => void;
}

export function ChannelListItem({
  channel,
  currentUserId,
  onPress,
}: ChannelListItemProps) {
  const hasUnread = channel.unread_count > 0;
  const isDeleted = !!channel.last_message_deleted_at;

  const getPreviewText = () => {
    if (!channel.last_message_text) return "No messages yet";
    if (isDeleted) return "[Message deleted]";

    const prefix =
      channel.last_message_sender_id === currentUserId ? "You: " : "";
    const truncated = channel.last_message_text.slice(0, 50);
    const suffix = channel.last_message_text.length > 50 ? "..." : "";
    return `${prefix}${truncated}${suffix}`;
  };

  return (
    <Pressable
      onPress={() => onPress(channel.friend_id)}
      className="flex-row items-center px-6 py-4 border-b border-gray-100"
    >
      <Avatar
        fullName={channel.full_name}
        avatarUrl={channel.avatar_url || undefined}
        size="small"
      />
      <View className="flex-1 ml-3">
        <Text
          className={`text-base ${hasUnread ? "font-bold" : "font-normal"} text-purple-900`}
        >
          {channel.full_name}
        </Text>
        <Text
          className={`text-sm ${hasUnread ? "font-semibold" : "font-normal"} text-gray-600`}
          numberOfLines={1}
        >
          {getPreviewText()}
        </Text>
      </View>
      <View className="items-end">
        {channel.last_message_created_at && (
          <Text className="text-xs text-gray-400 mb-1">
            {formatTimeAgo(channel.last_message_created_at)}
          </Text>
        )}
        {hasUnread && (
          <Badge variant="primary" size="small">
            {channel.unread_count.toString()}
          </Badge>
        )}
      </View>
    </Pressable>
  );
}
