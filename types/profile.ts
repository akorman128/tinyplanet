export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  website: string;
  hometown: string;
  birthday: string;
  location: string;
  phone_number: string;
  onboarding_invites_sent?: boolean;
  created_at?: string;
  updated_at?: string;
}
