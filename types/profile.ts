export interface Profile {
  id: string;
  updated_at: string;
  full_name: string;
  avatar_url: string;
  website: string;
  instagram?: string;
  x?: string;
  letterboxd?: string;
  beli?: string;
  location: string;
  hometown: string;
  birthday: string;
  phone_number: string;
  invited_by?: string;
  onboarding_invites_sent?: boolean;
  created_at: string;
  latitude?: number;
  longitude?: number;
  friend_count?: number;
  mutual_friend_count?: number;
  post_count?: number;
}
