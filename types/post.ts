export type PostVisibility = "friends" | "mutuals" | "public";

export interface Post {
  id: string;
  author_id: string;
  text: string;
  visibility: PostVisibility;
  media_urls: string[];
  edited_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostWithAuthor extends Post {
  author: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
  like_count: number;
  comment_count: number;
  liked_by_user: boolean;
}

export interface CreatePostInput {
  text: string;
  visibility: PostVisibility;
  media_urls?: string[];
}

export interface UpdatePostInput {
  text?: string;
  visibility?: PostVisibility;
  media_urls?: string[];
}
