import React, { useState, useEffect } from "react";
import { ActionSheetIOS, Platform, Alert, Pressable } from "react-native";
import { Badge, Button } from "@/design-system";
import { FriendshipDisplayStatus } from "@/types/friendship";
import { useFriends } from "@/hooks/useFriends";

type FriendStatusSectionProps = {
  userId: string;
  onStatusChange?: (status: FriendshipDisplayStatus) => void;
  onError?: (error: string) => void;
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
  userId,
  onStatusChange,
  onError,
}: FriendStatusSectionProps) {
  const {
    getFriendshipStatus,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
  } = useFriends();

  const [status, setStatus] = useState<FriendshipDisplayStatus | "loading">(
    "loading"
  );
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch initial friendship status
  useEffect(() => {
    const fetchStatus = async () => {
      setStatus("loading");
      try {
        const statusResult = await getFriendshipStatus(userId);
        setStatus(statusResult.status);
        onStatusChange?.(statusResult.status);
      } catch (err) {
        setStatus(FriendshipDisplayStatus.NOT_FRIENDS);
        onStatusChange?.(FriendshipDisplayStatus.NOT_FRIENDS);
      }
    };

    fetchStatus();
  }, [userId, getFriendshipStatus, onStatusChange]);

  const updateStatus = (newStatus: FriendshipDisplayStatus) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const handleAddFriend = async () => {
    setActionLoading(true);
    try {
      await sendFriendRequest({ targetUserId: userId });
      updateStatus(FriendshipDisplayStatus.PENDING_SENT);
    } catch (err) {
      onError?.("Failed to send friend request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnfriend = async () => {
    setActionLoading(true);
    try {
      await unfriend({ targetUserId: userId });
      updateStatus(FriendshipDisplayStatus.NOT_FRIENDS);
    } catch (err) {
      onError?.("Failed to unfriend");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    setActionLoading(true);
    try {
      await acceptFriendRequest({ fromUserId: userId });
      updateStatus(FriendshipDisplayStatus.FRIENDS);
    } catch (err) {
      onError?.("Failed to accept friend request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeclineRequest = async () => {
    setActionLoading(true);
    try {
      await declineFriendRequest({ targetUserId: userId });
      updateStatus(FriendshipDisplayStatus.NOT_FRIENDS);
    } catch (err) {
      onError?.("Failed to decline friend request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    setActionLoading(true);
    try {
      await declineFriendRequest({ targetUserId: userId });
      updateStatus(FriendshipDisplayStatus.NOT_FRIENDS);
    } catch (err) {
      onError?.("Failed to cancel friend request");
    } finally {
      setActionLoading(false);
    }
  };

  if (status === "loading") {
    return null;
  }

  const handleFollow = () => {
    handleAddFriend();
  };

  const handlePending = () => {
    showConfirmation(
      "Cancel Friend Request",
      "Do you want to cancel this friend request?",
      "Cancel Request",
      handleCancelRequest,
      false
    );
  };

  const handleFriends = () => {
    showConfirmation(
      "Unfriend",
      "Are you sure you want to remove this friend?",
      "Unfriend",
      handleUnfriend,
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
                  if (buttonIndex === 1) {
                    handleAcceptRequest();
                  } else if (buttonIndex === 2) {
                    handleDeclineRequest();
                  }
                }
              );
            } else {
              Alert.alert("Friend Request", "What would you like to do?", [
                { text: "Cancel", style: "cancel" },
                { text: "Accept", onPress: handleAcceptRequest },
                {
                  text: "Decline",
                  onPress: handleDeclineRequest,
                  style: "destructive",
                },
              ]);
            }
          },
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <Pressable onPress={buttonConfig.onPress} className="mb-4">
      <Badge variant="default" size="small">
        {buttonConfig.text}
      </Badge>
    </Pressable>
  );
}
