import React from "react";
import { View, Text, Pressable, Alert, ActionSheetIOS, Platform } from "react-native";
import { MessageWithSender } from "@/types/chat";
import { useRequireProfile } from "@/hooks/useRequireProfile";

interface MessageBubbleProps {
  message: MessageWithSender;
  onEdit?: (message: MessageWithSender) => void;
  onDelete?: (messageId: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onEdit,
  onDelete,
}) => {
  const profile = useRequireProfile();
  const isOwnMessage = message.sender_id === profile.id;
  const isDeleted = !!message.deleted_at;
  const isEdited = !!message.edited_at;

  const handleLongPress = () => {
    if (!isOwnMessage || isDeleted) return;

    const options = ["Cancel", "Edit", "Delete"];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 0;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          destructiveButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            onEdit?.(message);
          } else if (buttonIndex === 2) {
            onDelete?.(message.id);
          }
        }
      );
    } else {
      Alert.alert("Message Actions", "What would you like to do?", [
        { text: "Cancel", style: "cancel" },
        { text: "Edit", onPress: () => onEdit?.(message) },
        {
          text: "Delete",
          onPress: () => onDelete?.(message.id),
          style: "destructive",
        },
      ]);
    }
  };

  return (
    <Pressable
      onLongPress={handleLongPress}
      className={`mb-3 ${isOwnMessage ? "items-end" : "items-start"}`}
    >
      <View
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isOwnMessage ? "bg-purple-600" : "bg-gray-200"
        }`}
      >
        {isDeleted ? (
          <Text
            className={`text-sm italic ${
              isOwnMessage ? "text-white/70" : "text-gray-500"
            }`}
          >
            Message deleted
          </Text>
        ) : (
          <>
            <Text
              className={`text-base ${
                isOwnMessage ? "text-white" : "text-gray-900"
              }`}
            >
              {message.text}
            </Text>
            {isEdited && (
              <Text
                className={`text-xs mt-1 ${
                  isOwnMessage ? "text-white/70" : "text-gray-500"
                }`}
              >
                (edited)
              </Text>
            )}
          </>
        )}
      </View>
      <Text className="text-xs text-gray-500 mt-1 px-1">
        {new Date(message.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </Pressable>
  );
};
