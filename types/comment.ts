export interface Comment {
  id: string;
  post_id: string;
  parent_comment_id: string | null;
  author_id: string;
  body: string;
  edited_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
  like_count: number;
  liked_by_user: boolean;
  replies?: CommentWithAuthor[];
}

export interface CreateCommentInput {
  post_id: string;
  parent_comment_id?: string | null;
  body: string;
}

export interface UpdateCommentInput {
  body: string;
}
