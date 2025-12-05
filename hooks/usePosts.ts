import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";
import {
  Post,
  PostWithAuthor,
  CreatePostInput,
  UpdatePostInput,
} from "../types/post";

export const usePosts = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  // ––– QUERIES –––

  interface GetPostOutput {
    data: PostWithAuthor;
  }

  const getPost = async (postId: string): Promise<GetPostOutput> => {
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!posts_author_id_fkey(id, full_name, avatar_url)
      `
      )
      .eq("id", postId)
      .single();

    if (postError) throw postError;

    // Get like count
    const { count: likeCount, error: likeCountError } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    if (likeCountError) throw likeCountError;

    // Get comment count
    const { count: commentCount, error: commentCountError } = await supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    if (commentCountError) throw commentCountError;

    // Check if current user liked
    const { data: userLike, error: userLikeError } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", profile.id)
      .maybeSingle();

    if (userLikeError) throw userLikeError;

    const postWithAuthor: PostWithAuthor = {
      ...post,
      author: post.author,
      like_count: likeCount || 0,
      comment_count: commentCount || 0,
      liked_by_user: !!userLike,
    };

    return { data: postWithAuthor };
  };

  interface CreatePostOutput {
    data: Post;
  }

  const createPost = async (
    input: CreatePostInput
  ): Promise<CreatePostOutput> => {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        author_id: profile.id,
        text: input.text,
        visibility: input.visibility,
        media_urls: input.media_urls || [],
      })
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  interface UpdatePostOutput {
    data: Post;
  }

  const updatePost = async (
    postId: string,
    input: UpdatePostInput
  ): Promise<UpdatePostOutput> => {
    const updates: {
      edited_at: string;
      text?: string;
      visibility?: "friends" | "mutuals" | "public";
      media_urls?: string[];
    } = {
      edited_at: new Date().toISOString(),
    };

    if (input.text !== undefined) updates.text = input.text;
    if (input.visibility !== undefined) updates.visibility = input.visibility;
    if (input.media_urls !== undefined) updates.media_urls = input.media_urls;

    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", postId)
      .eq("author_id", profile.id)
      .select()
      .single();

    if (error) throw error;
    return { data };
  };

  const deletePost = async (postId: string): Promise<void> => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("author_id", profile.id);

    if (error) throw error;
  };

  return {
    isLoaded,
    getPost,
    createPost,
    updatePost,
    deletePost,
  };
};
