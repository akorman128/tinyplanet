import React, { forwardRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Input,
  Button,
  Icons,
  colors,
  LoadingState,
  EmptyState,
} from "@/design-system";
import { useComments } from "@/hooks/useComments";
import { useLikes } from "@/hooks/useLikes";
import { CommentWithAuthor } from "@/types/comment";
import { CommentItem } from "./CommentItem";

const commentSchema = z.object({
  body: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment is too long")
    .trim(),
});

type CommentForm = z.infer<typeof commentSchema>;

interface CommentsSheetProps {
  postId: string;
  initialCommentCount: number;
  onCommentCountChange?: (postId: string, newCount: number) => void;
  onSheetChange?: (index: number) => void;
}

export const CommentsSheet = forwardRef<BottomSheet, CommentsSheetProps>(
  (
    { postId, initialCommentCount, onCommentCountChange, onSheetChange },
    ref
  ) => {
    const { getComments, createComment } = useComments();
    const { likeComment, unlikeComment } = useLikes();

    const [comments, setComments] = useState<CommentWithAuthor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState<CommentWithAuthor | null>(
      null
    );
    const [sheetIndex, setSheetIndex] = useState(-1);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<CommentForm>({
      resolver: zodResolver(commentSchema),
      defaultValues: { body: "" },
      mode: "onChange",
    });

    // Fetch comments when sheet opens
    useEffect(() => {
      if (sheetIndex >= 0) {
        loadComments();
      }
    }, [sheetIndex]);

    const loadComments = async () => {
      try {
        setLoading(true);
        const result = await getComments(postId);
        setComments(result.data);
      } catch (err) {
        console.error("Error loading comments:", err);
        Alert.alert("Error", "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    const handleSheetChange = useCallback(
      (index: number) => {
        setSheetIndex(index);
        onSheetChange?.(index);
      },
      [onSheetChange]
    );

    const onSubmit = async (data: CommentForm) => {
      setIsSubmitting(true);

      // Create optimistic comment
      const optimisticComment: CommentWithAuthor = {
        id: `temp-${Date.now()}`,
        post_id: postId,
        parent_comment_id: replyingTo?.id || null,
        author_id: "current-user",
        body: data.body,
        edited_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: {
          id: "current-user",
          full_name: "You",
          avatar_url: "",
        },
        like_count: 0,
        liked_by_user: false,
        replies: [],
      };

      // Optimistic update
      if (replyingTo) {
        // Add as a reply
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === replyingTo.id
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), optimisticComment],
                }
              : comment
          )
        );
      } else {
        // Add as top-level comment
        setComments((prev) => [...prev, optimisticComment]);
      }

      try {
        await createComment({
          post_id: postId,
          parent_comment_id: replyingTo?.id || null,
          body: data.body,
        });

        // Update comment count in parent
        const newCount = initialCommentCount + 1;
        onCommentCountChange?.(postId, newCount);

        // Reset form and reply state
        reset();
        setReplyingTo(null);

        // Reload comments to get the real data
        await loadComments();
      } catch (err) {
        // Revert optimistic update on error
        if (replyingTo) {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === replyingTo.id
                ? {
                    ...comment,
                    replies: (comment.replies || []).filter(
                      (r) => r.id !== optimisticComment.id
                    ),
                  }
                : comment
            )
          );
        } else {
          setComments((prev) =>
            prev.filter((c) => c.id !== optimisticComment.id)
          );
        }

        console.error("Error creating comment:", err);
        Alert.alert("Error", "Failed to post comment");
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleLikeToggle = useCallback(
      async (commentId: string, currentState: boolean) => {
        // Optimistic update
        const updateCommentLike = (
          comments: CommentWithAuthor[]
        ): CommentWithAuthor[] =>
          comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                liked_by_user: !currentState,
                like_count: currentState
                  ? comment.like_count - 1
                  : comment.like_count + 1,
              };
            }
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: updateCommentLike(comment.replies),
              };
            }
            return comment;
          });

        setComments((prev) => updateCommentLike(prev));

        try {
          if (currentState) {
            await unlikeComment(commentId);
          } else {
            await likeComment(commentId);
          }
        } catch (err) {
          // Revert on error
          setComments((prev) => updateCommentLike(prev));
          console.error("Error toggling like:", err);
        }
      },
      [likeComment, unlikeComment]
    );

    const handleReply = useCallback((comment: CommentWithAuthor) => {
      setReplyingTo(comment);
    }, []);

    const handleCancelReply = () => {
      setReplyingTo(null);
    };

    const renderComment = useCallback(
      ({ item }: { item: CommentWithAuthor }) => (
        <CommentItem
          comment={item}
          depth={0}
          onReply={handleReply}
          onLikeToggle={handleLikeToggle}
        />
      ),
      [handleReply, handleLikeToggle]
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["80%"]}
        enablePanDownToClose
        onChange={handleSheetChange}
        backgroundStyle={{
          backgroundColor: colors.hex.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.hex.placeholder,
          width: 40,
          height: 4,
        }}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetView className="flex-1">
          {/* Comments List */}
          {loading ? (
            <View className="flex-1 justify-center">
              <LoadingState />
            </View>
          ) : comments.length === 0 ? (
            <View className="flex-1 mt-10 mb-10 justify-center">
              <EmptyState message="Start yapping..." />
            </View>
          ) : (
            <BottomSheetFlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item: CommentWithAuthor) => item.id}
              contentContainerClassName="px-6 pb-4"
              ItemSeparatorComponent={() => (
                <View className="h-px bg-gray-100 my-2" />
              )}
            />
          )}

          {/* Sticky Input Area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
          >
            <View className="px-6 py-4 border-t border-gray-200 bg-white">
              {/* Reply context chip */}
              {replyingTo && (
                <View className="flex-row items-center justify-between mb-2 px-3 py-2 bg-purple-50 rounded-lg">
                  <Text className="text-sm text-purple-700">
                    Replying to {replyingTo.author.full_name}
                  </Text>
                  <Pressable onPress={handleCancelReply}>
                    <Icons.close size={16} color={colors.hex.purple600} />
                  </Pressable>
                </View>
              )}

              {/* Comment input and submit button */}
              <View className="flex-row items-end gap-2 ">
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="body"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Add comment..."
                        multiline
                        maxLength={500}
                        error={errors.body?.message}
                        className="max-h-[100px]"
                      />
                    )}
                  />
                </View>

                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting || !!errors.body}
                  className={`px-4 py-3 rounded-lg ${
                    isSubmitting || !!errors.body
                      ? "bg-gray-300"
                      : "bg-purple-600"
                  }`}
                >
                  <Icons.send
                    size={20}
                    color={
                      isSubmitting || !!errors.body
                        ? colors.hex.gray500
                        : colors.hex.white
                    }
                  />
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

CommentsSheet.displayName = "CommentsSheet";
