import { useEffect } from "react";
import { router } from "expo-router";

export default function SignUpIndex() {
  useEffect(() => {
    // Redirect to the first step of signup
    router.replace("/sign-up/invite-code");
  }, []);

  return null;
}
