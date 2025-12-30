import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Avatar, Icons, colors } from "@/design-system";
import { PostWithAuthor } from "@/types/post";
import { useLikes } from "@/hooks/useLikes";
import { useSavedPosts } from "@/hooks/useSavedPosts";
import { formatTimeAgo } from "@/utils";

interface TravelPlanCardProps {
  post: PostWithAuthor;
  onLike: (postId: string, updates: Partial<PostWithAuthor>) => void;
  onSave: (postId: string, updates: Partial<PostWithAuthor>) => void;
  onDelete: (postId: string) => void;
  onOpenComments: (postId: string, commentCount: number) => void;
}

/**
 * Specialized card for travel plan posts
 * Displays with distinct styling and travel-specific UI
 */
export function TravelPlanCard({
  post,
  onLike,
  onSave,
  onDelete,
  onOpenComments,
}: TravelPlanCardProps) {
  const router = useRouter();
  const { likePost, unlikePost } = useLikes();
  const { savePost, unsavePost } = useSavedPosts();
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleProfilePress = () => {
    router.push({ pathname: "/profile", params: { userId: post.author.id } });
  };

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
      // Revert optimistic update on error
      onLike(post.id, {
        liked_by_user: wasLiked,
        like_count: post.like_count,
      });
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

  // Parse travel plan details from post text
  // Format: "🚀 Traveling to {destination} from {start} to {end} ({duration} days)"
  const parseTravelDetails = () => {
    const match = post.text.match(
      /🚀 Traveling to (.+?) from (.+?) to (.+?) \((\d+) days?\)/
    );

    if (!match) {
      return {
        destination: "Unknown",
        startDate: "",
        endDate: "",
        duration: "",
      };
    }

    return {
      destination: match[1],
      startDate: match[2],
      endDate: match[3],
      duration: match[4],
    };
  };

  const { destination, startDate, endDate, duration } = parseTravelDetails();

  return (
    <View className="px-5 py-4 border-b border-gray-200 bg-orange-50">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Pressable onPress={handleProfilePress}>
          <Avatar
            fullName={post.author.full_name}
            avatarUrl={post.author.avatar_url}
            size="small"
          />
        </Pressable>

        <View className="flex-1 ml-3">
          <View className="flex-row items-center">
            <Text className="text-base font-semibold text-gray-900">
              {post.author.full_name}
            </Text>
            <Text className="text-sm text-gray-500 ml-2">
              • {formatTimeAgo(post.created_at)}
            </Text>
          </View>
          <Text className="text-sm text-orange-600 font-medium">
            Travel Plan
          </Text>
        </View>
      </View>

      {/* Travel Details Card */}
      <View className="bg-white rounded-lg p-4 border border-orange-200 mb-3">
        <View className="flex-row items-center mb-2">
          <Text className="text-2xl mr-2">🚀</Text>
          <Text className="text-lg font-bold text-gray-900 flex-1">
            {destination}
          </Text>
        </View>

        <View className="flex-row items-center mb-1">
          <Icons.calendar size={16} color={colors.hex.gray600} />
          <Text className="text-sm text-gray-600 ml-2">
            {startDate} → {endDate}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Icons.clock size={16} color={colors.hex.gray600} />
          <Text className="text-sm text-gray-600 ml-2">
            {duration} {parseInt(duration) === 1 ? "day" : "days"}
          </Text>
        </View>
      </View>

      {/* Actions row */}
      <View className="flex-row items-center gap-4">
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
      </View>

      {post.edited_at && (
        <Text className="text-xs text-gray-500 mt-2">Edited</Text>
      )}
    </View>
  );
}
