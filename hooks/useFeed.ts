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
    // Use optimized RPC function that aggregates counts in a single query
    // The RLS policies handle the visibility filtering automatically
    const { limit, offset } = options;

    const { data: posts, error: postsError } = await supabase.rpc(
      "get_feed_posts",
      {
        user_id_param: profileState!.id,
        limit_param: limit,
        offset_param: offset,
      }
    );

    if (postsError) throw postsError;

    return { data: (posts as PostWithAuthor[]) || [] };
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
    // Use optimized RPC function that aggregates counts in a single query
    const { limit, offset } = options;

    const { data: posts, error: postsError } = await supabase.rpc(
      "get_user_posts",
      {
        user_id_param: profileState!.id,
        target_user_id: userId,
        limit_param: limit,
        offset_param: offset,
      }
    );

    if (postsError) throw postsError;

    return { data: (posts as PostWithAuthor[]) || [] };
  };

  return {
    isLoaded,
    getFeed,
    getUserPosts,
  };
};
