export interface Like {
  id: string;
  user_id: string;
  post_id: string | null;
  comment_id: string | null;
  created_at: string;
}
