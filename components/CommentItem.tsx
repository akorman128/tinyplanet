import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Avatar, Icons, colors } from "@/design-system";
import { CommentWithAuthor } from "@/types/comment";
import { formatTimeAgo } from "@/utils";

interface CommentItemProps {
  comment: CommentWithAuthor;
  depth: number;
  onReply: (comment: CommentWithAuthor) => void;
  onLikeToggle: (commentId: string, currentState: boolean) => void;
}

export function CommentItem({
  comment,
  depth,
  onReply,
  onLikeToggle,
}: CommentItemProps) {
  const [isLiking, setIsLiking] = useState(false);

  const handleLikeToggle = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      await onLikeToggle(comment.id, comment.liked_by_user);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReply = () => {
    onReply(comment);
  };

  // Limit visual depth to 1 level
  const visualDepth = Math.min(depth, 1);
  const indentClass = visualDepth === 1 ? "ml-10 pl-3 border-l border-gray-200" : "";

  return (
    <View className={`py-3 ${indentClass}`}>
      <View className="flex-row">
        <Avatar
          fullName={comment.author.full_name}
          avatarUrl={comment.author.avatar_url}
          size="small"
        />

        <View className="flex-1 ml-3">
          {/* Author name and timestamp */}
          <View className="flex-row items-center mb-1">
            <Text className="text-sm font-semibold text-gray-900">
              {comment.author.full_name}
            </Text>
            <Text className="text-xs text-gray-500 ml-2">
              {formatTimeAgo(comment.created_at)}
            </Text>
            {comment.edited_at && (
              <Text className="text-xs text-gray-500 ml-1">(edited)</Text>
            )}
          </View>

          {/* Comment body */}
          <Text className="text-sm text-gray-900 leading-5 mb-2">
            {comment.body}
          </Text>

          {/* Actions: Like and Reply */}
          <View className="flex-row items-center gap-4">
            {/* Like button */}
            <Pressable
              className="flex-row items-center"
              onPress={handleLikeToggle}
              disabled={isLiking}
            >
              <Icons.heartOutline
                size={16}
                color={comment.liked_by_user ? colors.hex.error : colors.hex.gray500}
              />
              {comment.like_count > 0 && (
                <Text
                  className={`text-xs ml-1 ${
                    comment.liked_by_user ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {comment.like_count}
                </Text>
              )}
            </Pressable>

            {/* Reply button */}
            <Pressable onPress={handleReply}>
              <Text className="text-xs font-medium text-gray-600">Reply</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <View className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
              onLikeToggle={onLikeToggle}
            />
          ))}
        </View>
      )}
    </View>
  );
}
