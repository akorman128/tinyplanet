import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";
import {
  Comment,
  CommentWithAuthor,
  CreateCommentInput,
  UpdateCommentInput,
} from "../types/comment";

export const useComments = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  // ––– QUERIES –––

  interface GetCommentsOutput {
    data: CommentWithAuthor[];
  }

  const getComments = async (postId: string): Promise<GetCommentsOutput> => {
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select(
        `
        *,
        author:profiles!comments_author_id_fkey(id, full_name, avatar_url)
      `
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (commentsError) throw commentsError;

    // Get like counts and user likes for all comments
    const commentIds = comments.map((c) => c.id);

    const { data: likes, error: likesError } = await supabase
      .from("likes")
      .select("comment_id, user_id")
      .in("comment_id", commentIds);

    if (likesError) throw likesError;

    // Build nested comment structure
    const commentMap = new Map<string, CommentWithAuthor>();
    const rootComments: CommentWithAuthor[] = [];

    comments.forEach((comment) => {
      const commentLikes =
        likes?.filter((l) => l.comment_id === comment.id) || [];
      const commentWithAuthor: CommentWithAuthor = {
        ...comment,
        author: comment.author,
        like_count: commentLikes.length,
        liked_by_user: commentLikes.some((l) => l.user_id === profile.id),
        replies: [],
      };

      commentMap.set(comment.id, commentWithAuthor);
    });

    // Build tree structure
    comments.forEach((comment) => {
      const commentWithAuthor = commentMap.get(comment.id)!;
      if (comment.parent_comment_id) {
        const parent = commentMap.get(comment.parent_comment_id);
        if (parent) {
          parent.replies!.push(commentWithAuthor);
        }
      } else {
        rootComments.push(commentWithAuthor);
      }
    });

    return { data: rootComments };
  };

  interface CreateCommentOutput {
    data: Comment;
  }

  const createComment = async (
    input: CreateCommentInput
  ): Promise<CreateCommentOutput> => {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: input.post_id,
        parent_comment_id: input.parent_comment_id || null,
        author_id: profile.id,
        body: input.body,
      })
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  interface UpdateCommentOutput {
    data: Comment;
  }

  const updateComment = async (
    commentId: string,
    input: UpdateCommentInput
  ): Promise<UpdateCommentOutput> => {
    const { data, error } = await supabase
      .from("comments")
      .update({
        body: input.body,
        edited_at: new Date().toISOString(),
      })
      .eq("id", commentId)
      .eq("author_id", profile.id)
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const deleteComment = async (commentId: string): Promise<void> => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("author_id", profile.id);

    if (error) throw error;
  };

  return {
    isLoaded,
    getComments,
    createComment,
    updateComment,
    deleteComment,
  };
};
