import { useSupabase } from "./useSupabase";
import { useProfileStore } from "../stores/profileStore";
import { useProfile } from "./useProfile";

interface signInWithPasswordDto {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const { isLoaded, supabase } = useSupabase();
  const { getProfile } = useProfile();
  const { setProfileState } = useProfileStore();

  const signInWithPassword = async (
    input: signInWithPasswordDto
  ): Promise<void> => {
    const { email, password } = input;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const { data: user } = await getProfile({ userId: data.user.id });

    // GET USER
    setProfileState({
      id: data.user.id,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      website: user.website,
      hometown: user.hometown,
      birthday: user.birthday,
      location: user.location,
    });
  };

  return {
    isLoaded,
    signInWithPassword,
  };
};
