import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";
import { PostWithAuthor } from "@/types/post";

export const useSavedPosts = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  // ––– QUERIES –––

  interface GetSavedPostsOutput {
    data: PostWithAuthor[];
  }

  const getSavedPosts = async (options: {
    limit: number;
    offset: number;
  }): Promise<GetSavedPostsOutput> => {
    const { limit, offset } = options;

    const { data: posts, error: postsError } = await supabase.rpc(
      "get_saved_posts",
      {
        user_id_param: profile.id,
        limit_param: limit,
        offset_param: offset,
      }
    );

    if (postsError) throw postsError;

    return { data: (posts as PostWithAuthor[]) || [] };
  };

  // ––– MUTATIONS –––

  const savePost = async (postId: string): Promise<void> => {
    const { error } = await supabase.from("saved_posts").insert({
      user_id: profile.id,
      post_id: postId,
    });

    if (error) throw error;
  };

  const unsavePost = async (postId: string): Promise<void> => {
    const { error } = await supabase
      .from("saved_posts")
      .delete()
      .eq("user_id", profile.id)
      .eq("post_id", postId);

    if (error) throw error;
  };

  return {
    isLoaded,
    getSavedPosts,
    savePost,
    unsavePost,
  };
};
