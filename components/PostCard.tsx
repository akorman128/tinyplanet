import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Avatar, Icons, colors } from "@/design-system";
import { PostWithAuthor, PostVisibility } from "@/types/post";
import { useLikes } from "@/hooks/useLikes";
import { useSavedPosts } from "@/hooks/useSavedPosts";
import { usePosts } from "@/hooks/usePosts";
import { useSupabase } from "@/hooks/useSupabase";
import { formatTimeAgo } from "@/utils";

interface EditPost {
  id: string;
  text: string;
  visibility: PostVisibility;
}

interface PostCardProps {
  post: PostWithAuthor;
  onLike: (postId: string, updates: Partial<PostWithAuthor>) => void;
  onSave: (postId: string, updates: Partial<PostWithAuthor>) => void;
  onDelete: (postId: string) => void;
  onOpenComments: (postId: string, commentCount: number) => void;
  onEditPost?: (post: EditPost) => void;
}

export function PostCard({
  post,
  onLike,
  onSave,
  onDelete,
  onOpenComments,
  onEditPost,
}: PostCardProps) {
  const router = useRouter();
  const { session } = useSupabase();
  const { likePost, unlikePost } = useLikes();
  const { savePost, unsavePost } = useSavedPosts();
  const { deletePost } = usePosts();
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLikeToggle = async () => {
    if (isLiking) return;

    setIsLiking(true);
    const wasLiked = post.liked_by_user;

    // Optimistic update
    onLike(post.id, {
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
      console.error("Error toggling like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleSaveToggle = async () => {
    if (isSaving) return;

    setIsSaving(true);
    const wasSaved = post.saved_by_user;

    // Optimistic update
    onSave(post.id, {
      saved_by_user: !wasSaved,
    });

    try {
      if (wasSaved) {
        await unsavePost(post.id);
      } else {
        await savePost(post.id);
      }
    } catch (err) {
      console.error("Error toggling save:", err);
      // Revert optimistic update on error
      onSave(post.id, {
        saved_by_user: wasSaved,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleComment = () => {
    onOpenComments(post.id, post.comment_count);
  };

  const handleOptions = () => {
    const isOwnPost = session?.user?.id === post.author.id;

    if (!isOwnPost) {
      Alert.alert("Options", "No actions available");
      return;
    }

    Alert.alert("Post Options", "Choose an action", [
      {
        text: "Edit Post",
        onPress: () => {
          onEditPost?.({
            id: post.id,
            text: post.text,
            visibility: post.visibility,
          });
        },
      },
      {
        text: "Delete Post",
        onPress: () => {
          Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post? This will remove it from all users' feeds.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                  try {
                    await deletePost(post.id);
                    onDelete(post.id);
                  } catch (err) {
                    console.error("Error deleting post:", err);
                    Alert.alert(
                      "Error",
                      "Failed to delete post. Please try again."
                    );
                  }
                },
              },
            ]
          );
        },
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
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

        {/* Actions row */}
        <View className="flex-row items-center gap-4">
          {/* Visibility indicator */}
          {visibilityIcon && (
            <View className="flex-row items-center">
              {visibilityIcon}
              <Text className="text-xs text-gray-500 ml-1 capitalize">
                {post.visibility}
              </Text>
            </View>
          )}
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

          {/* Save/Bookmark */}
          <Pressable
            className="flex-row items-center"
            onPress={handleSaveToggle}
            disabled={isSaving}
          >
            <Icons.bookmark
              size={20}
              color={
                post.saved_by_user ? colors.hex.purple600 : colors.hex.gray500
              }
              fill={post.saved_by_user ? colors.hex.purple600 : "none"}
            />
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
