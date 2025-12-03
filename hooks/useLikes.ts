import { useSupabase } from "./useSupabase";
import { useRequireProfile } from "./useRequireProfile";

export const useLikes = () => {
  const { isLoaded, supabase } = useSupabase();
  const profile = useRequireProfile();

  // ––– QUERIES –––

  const likePost = async (postId: string): Promise<void> => {
    const { error } = await supabase.from("likes").insert({
      user_id: profile.id,
      post_id: postId,
      comment_id: null,
    });

    if (error) throw error;
  };

  const unlikePost = async (postId: string): Promise<void> => {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", profile.id)
      .eq("post_id", postId);

    if (error) throw error;
  };

  const likeComment = async (commentId: string): Promise<void> => {
    const { error } = await supabase.from("likes").insert({
      user_id: profile.id,
      post_id: null,
      comment_id: commentId,
    });

    if (error) throw error;
  };

  const unlikeComment = async (commentId: string): Promise<void> => {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", profile.id)
      .eq("comment_id", commentId);

    if (error) throw error;
  };

  return {
    isLoaded,
    likePost,
    unlikePost,
    likeComment,
    unlikeComment,
  };
};
