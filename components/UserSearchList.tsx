import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "@/design-system";
import { colors } from "@/design-system/colors";
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
    <View style={styles.container}>
      <Avatar
        fullName={user.full_name}
        avatarUrl={user.avatar_url || undefined}
        size="small"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{user.full_name}</Text>
        <View style={styles.metaRow}>
          {user.hometown && (
            <Text style={styles.subtitle}>{user.hometown}</Text>
          )}
          <View
            style={[
              styles.badge,
              isFriend ? styles.friendBadge : styles.mutualBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isFriend ? styles.friendBadgeText : styles.mutualBadgeText,
              ]}
            >
              {isFriend ? "Friend" : "Mutual"}
            </Text>
          </View>
        </View>
      </View>
      {!isFriend && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAddFriend?.(user.id)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.hex.placeholder,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  friendBadge: {
    backgroundColor: colors.hex.purple200,
  },
  mutualBadge: {
    backgroundColor: "#f0f0f0",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  friendBadgeText: {
    color: colors.hex.purple700,
  },
  mutualBadgeText: {
    color: colors.hex.placeholder,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors.hex.purple600,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.hex.white,
  },
});
