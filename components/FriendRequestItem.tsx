import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "@/design-system";
import { colors } from "@/design-system/colors";
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
    <View style={styles.container}>
      <Avatar
        fullName={request.full_name}
        avatarUrl={request.avatar_url || undefined}
        size="small"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{request.full_name}</Text>
        {request.hometown && (
          <Text style={styles.subtitle}>{request.hometown}</Text>
        )}
      </View>
      <View style={styles.actions}>
        {isIncoming ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => onAccept?.(request.id)}
            >
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.declineButton]}
              onPress={() => onDecline?.(request.id)}
            >
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Pending</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.hex.purple900,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.hex.placeholder,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: colors.hex.purple600,
  },
  acceptText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.hex.white,
  },
  declineButton: {
    backgroundColor: "#f0f0f0",
  },
  declineText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.hex.placeholder,
  },
  pendingBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  pendingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.hex.placeholder,
  },
});
