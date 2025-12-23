import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Avatar, Icons, colors } from "@/design-system";
import { PostWithAuthor } from "@/types/post";
import { useLikes } from "@/hooks/useLikes";
import { formatTimeAgo } from "@/utils";

interface PostCardProps {
  post: PostWithAuthor;
  onUpdate: (postId: string, updates: Partial<PostWithAuthor>) => void;
  onDelete: (postId: string) => void;
}

export function PostCard({ post, onUpdate, onDelete }: PostCardProps) {
  const router = useRouter();
  const { likePost, unlikePost } = useLikes();
  const [isLiking, setIsLiking] = useState(false);

  const handleLikeToggle = async () => {
    if (isLiking) return;

    setIsLiking(true);
    const wasLiked = post.liked_by_user;

    // Optimistic update
    onUpdate(post.id, {
      liked_by_user: !wasLiked,
      like_count: wasLiked ? post.like_count - 1 : post.like_count + 1,
    });

    try {
      if (wasLiked) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
    } catch (err) {
      // Revert on error
      onUpdate(post.id, {
        liked_by_user: wasLiked,
        like_count: post.like_count,
      });
      console.error("Error toggling like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = () => {
    // Future: Navigate to post detail with comments
    Alert.alert("Comments", "Comment view coming soon");
  };

  const handleOptions = () => {
    // Future: Show action sheet (edit/delete if own post)
    Alert.alert("Options", "Edit/Delete coming soon");
  };

  const handleProfilePress = () => {
    router.push({ pathname: "/profile", params: { userId: post.author.id } });
  };

  const visibilityIcon = {
    public: null,
    friends: <Icons.unlocked size={14} color={colors.hex.gray500} />,
    mutuals: <Icons.lock size={14} color={colors.hex.gray500} />,
  }[post.visibility];

  return (
    <Pressable className="flex-row px-5 py-4 border-b border-gray-200">
      <Pressable onPress={handleProfilePress}>
        <Avatar
          fullName={post.author.full_name}
          avatarUrl={post.author.avatar_url}
          size="small"
        />
      </Pressable>

      <View className="flex-1 ml-3">
        {/* Header: Name • Time */}
        <View className="flex-row items-center mb-1">
          <Text className="text-base font-semibold text-gray-900">
            {post.author.full_name}
          </Text>
          <Text className="text-sm text-gray-500 ml-2">
            • {formatTimeAgo(post.created_at)}
          </Text>
        </View>

        {/* Post text */}
        <Text className="text-base text-gray-900 leading-5 mb-2">
          {post.text}
        </Text>

        {/* Visibility indicator */}
        {visibilityIcon && (
          <View className="flex-row items-center mb-3">
            {visibilityIcon}
            <Text className="text-xs text-gray-500 ml-1 capitalize">
              {post.visibility}
            </Text>
          </View>
        )}

        {/* Actions row */}
        <View className="flex-row items-center gap-6">
          {/* Like */}
          <Pressable
            className="flex-row items-center"
            onPress={handleLikeToggle}
            disabled={isLiking}
          >
            <Icons.heartOutline
              size={20}
              color={post.liked_by_user ? colors.hex.error : colors.hex.gray500}
            />
            {post.like_count > 0 && (
              <Text
                className={`text-sm ml-1 ${
                  post.liked_by_user ? "text-red-500" : "text-gray-500"
                }`}
              >
                {post.like_count}
              </Text>
            )}
          </Pressable>

          {/* Comment */}
          <Pressable className="flex-row items-center" onPress={handleComment}>
            <Icons.comment size={20} color={colors.hex.gray500} />
            {post.comment_count > 0 && (
              <Text className="text-sm text-gray-500 ml-1">
                {post.comment_count}
              </Text>
            )}
          </Pressable>

          {/* Options */}
          <Pressable onPress={handleOptions}>
            <Icons.dots size={20} color={colors.hex.gray500} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
