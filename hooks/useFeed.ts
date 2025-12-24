import { useSupabase } from "./useSupabase";
import { useProfileStore } from "../stores/profileStore";
import { PostWithAuthor } from "../types/post";

export const useFeed = () => {
  const { isLoaded, supabase } = useSupabase();
  const { profileState } = useProfileStore();

  // ––– QUERIES –––

  interface GetFeedOutput {
    data: PostWithAuthor[];
  }

  const getFeed = async (options: {
    limit: number;
    offset: number;
  }): Promise<GetFeedOutput> => {
    // The RLS policies handle the visibility filtering automatically
    // We just need to fetch posts and they'll be filtered based on:
    // - public posts (visible to all)
    // - author's own posts
    // - friends posts (if visibility = 'friends')
    // - mutuals posts (if visibility = 'mutuals')
    const { limit, offset } = options;
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!posts_author_id_fkey(id, full_name, avatar_url)
      `
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (postsError) throw postsError;

    if (!posts || posts.length === 0) {
      return { data: [] };
    }

    const postIds = posts.map((p) => p.id);

    // Get like counts for all posts
    const { data: likes, error: likesError } = await supabase
      .from("likes")
      .select("post_id, user_id")
      .in("post_id", postIds);

    if (likesError) throw likesError;

    // Get comment counts for all posts
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select("post_id")
      .in("post_id", postIds);

    if (commentsError) throw commentsError;

    // Build the feed with aggregated data
    const feed: PostWithAuthor[] = posts.map((post) => {
      const postLikes = likes?.filter((l) => l.post_id === post.id) || [];
      const postComments = comments?.filter((c) => c.post_id === post.id) || [];

      return {
        ...post,
        author: post.author,
        like_count: postLikes.length,
        comment_count: postComments.length,
        liked_by_user: postLikes.some((l) => l.user_id === profileState!.id),
      };
    });

    return { data: feed };
  };

  interface GetUserPostsOutput {
    data: PostWithAuthor[];
  }

  const getUserPosts = async (
    userId: string,
    options: {
      limit: number;
      offset: number;
    }
  ): Promise<GetUserPostsOutput> => {
    const { limit, offset } = options;

    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select(
        `
        *,
        author:profiles!posts_author_id_fkey(id, full_name, avatar_url)
      `
      )
      .eq("author_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (postsError) throw postsError;

    if (!posts || posts.length === 0) {
      return { data: [] };
    }

    const postIds = posts.map((p) => p.id);

    // Get like counts for all posts
    const { data: likes, error: likesError } = await supabase
      .from("likes")
      .select("post_id, user_id")
      .in("post_id", postIds);

    if (likesError) throw likesError;

    // Get comment counts for all posts
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select("post_id")
      .in("post_id", postIds);

    if (commentsError) throw commentsError;

    // Build the feed with aggregated data
    const userPosts: PostWithAuthor[] = posts.map((post) => {
      const postLikes = likes?.filter((l) => l.post_id === post.id) || [];
      const postComments = comments?.filter((c) => c.post_id === post.id) || [];

      return {
        ...post,
        author: post.author,
        like_count: postLikes.length,
        comment_count: postComments.length,
        liked_by_user: postLikes.some((l) => l.user_id === profileState!.id),
      };
    });

    return { data: userPosts };
  };

  return {
    isLoaded,
    getFeed,
    getUserPosts,
  };
};
