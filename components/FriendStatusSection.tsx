import React from "react";
import { Pressable, ActionSheetIOS, Platform, Alert } from "react-native";
import { Icons, colors } from "@/design-system";
import { FriendshipDisplayStatus } from "@/types/friendship";

type FriendStatusSectionProps = {
  status: FriendshipDisplayStatus | "loading";
  onAddFriend?: () => void;
  onUnfriend?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  actionLoading?: boolean;
};

type IconConfig = {
  Icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  onPress?: () => void;
  size: number;
};

const showConfirmation = (
  title: string,
  message: string,
  confirmText: string,
  onConfirm?: () => void,
  isDestructive = false
) => {
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
};

const showFriendRequestActions = (
  onAccept?: () => void,
  onDecline?: () => void
) => {
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
};

export function FriendStatusSection({
  status,
  onAddFriend,
  onUnfriend,
  onAccept,
  onDecline,
  actionLoading = false,
}: FriendStatusSectionProps) {
  if (status === "loading") {
    return null;
  }

  const handleAddFriend = () => {
    showConfirmation(
      "Send Friend Request",
      "Would you like to send a friend request to this person?",
      "Send Friend Request",
      onAddFriend
    );
  };

  const handleUnfriend = () => {
    showConfirmation(
      "Unfriend",
      "Are you sure you want to remove this friend?",
      "Unfriend",
      onUnfriend,
      true
    );
  };

  const handlePendingReceived = () => {
    showFriendRequestActions(onAccept, onDecline);
  };

  const iconConfig: IconConfig = (() => {
    switch (status) {
      case FriendshipDisplayStatus.FRIENDS:
        return {
          Icon: Icons.circleCheck,
          color: colors.neutral.gray400,
          onPress: handleUnfriend,
          size: 32,
        };
      case FriendshipDisplayStatus.NOT_FRIENDS:
        return {
          Icon: Icons.plus,
          color: colors.neutral.gray400,
          onPress: handleAddFriend,
          size: 32,
        };
      case FriendshipDisplayStatus.PENDING_SENT:
        return {
          Icon: Icons.clock,
          color: colors.neutral.gray400,
          size: 32,
        };
      case FriendshipDisplayStatus.PENDING_RECEIVED:
        return {
          Icon: Icons.notification,
          color: colors.neutral.gray400,
          onPress: handlePendingReceived,
          size: 32,
        };
    }
  })();

  const IconComponent = iconConfig.Icon;

  return (
    <Pressable
      onPress={iconConfig.onPress}
      disabled={actionLoading || !iconConfig.onPress}
      className="ml-2"
      style={{ opacity: actionLoading ? 0.5 : 1 }}
    >
      <IconComponent size={iconConfig.size} color={iconConfig.color} />
    </Pressable>
  );
}
