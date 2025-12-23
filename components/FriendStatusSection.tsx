import React from "react";
import { ActionSheetIOS, Platform, Alert } from "react-native";
import { Button } from "@/design-system";
import { FriendshipDisplayStatus } from "@/types/friendship";

type FriendStatusSectionProps = {
  status: FriendshipDisplayStatus | "loading";
  onAddFriend?: () => void;
  onUnfriend?: () => void;
  onCancelRequest?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  actionLoading?: boolean;
};

const showConfirmation = (
  title: string,
  message: string,
  confirmText: string,
  onConfirm?: () => void,
  isDestructive = false
) => {
  if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", confirmText],
        cancelButtonIndex: 0,
        destructiveButtonIndex: isDestructive ? 1 : undefined,
      },
      (buttonIndex) => {
        if (buttonIndex === 1 && onConfirm) {
          onConfirm();
        }
      }
    );
  } else {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      {
        text: confirmText,
        onPress: onConfirm,
        style: isDestructive ? "destructive" : "default",
      },
    ]);
  }
};


export function FriendStatusSection({
  status,
  onAddFriend,
  onUnfriend,
  onCancelRequest,
  onAccept,
  onDecline,
  actionLoading = false,
}: FriendStatusSectionProps) {
  if (status === "loading") {
    return null;
  }

  const handleFollow = () => {
    if (onAddFriend) {
      onAddFriend();
    }
  };

  const handlePending = () => {
    showConfirmation(
      "Cancel Friend Request",
      "Do you want to cancel this friend request?",
      "Cancel Request",
      onCancelRequest,
      false
    );
  };

  const handleFriends = () => {
    showConfirmation(
      "Unfriend",
      "Are you sure you want to remove this friend?",
      "Unfriend",
      onUnfriend,
      true
    );
  };

  const getButtonConfig = () => {
    switch (status) {
      case FriendshipDisplayStatus.NOT_FRIENDS:
        return {
          text: "Follow",
          onPress: handleFollow,
        };
      case FriendshipDisplayStatus.PENDING_SENT:
        return {
          text: "Pending",
          onPress: handlePending,
        };
      case FriendshipDisplayStatus.FRIENDS:
        return {
          text: "Friends",
          onPress: handleFriends,
        };
      case FriendshipDisplayStatus.PENDING_RECEIVED:
        // For incoming requests, we could show different UI
        // For now, showing a simple "Respond" button
        return {
          text: "Respond",
          onPress: () => {
            if (Platform.OS === "ios") {
              ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: ["Cancel", "Accept Request", "Decline Request"],
                  cancelButtonIndex: 0,
                  destructiveButtonIndex: 2,
                },
                (buttonIndex) => {
                  if (buttonIndex === 1 && onAccept) {
                    onAccept();
                  } else if (buttonIndex === 2 && onDecline) {
                    onDecline();
                  }
                }
              );
            } else {
              Alert.alert("Friend Request", "What would you like to do?", [
                { text: "Cancel", style: "cancel" },
                { text: "Accept", onPress: onAccept },
                { text: "Decline", onPress: onDecline, style: "destructive" },
              ]);
            }
          },
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <Button
      onPress={buttonConfig.onPress}
      disabled={actionLoading}
      variant="secondary"
      className="ml-2 min-w-[90px]"
    >
      {buttonConfig.text}
    </Button>
  );
}
