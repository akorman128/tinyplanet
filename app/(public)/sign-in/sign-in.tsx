import { useSignIn } from "@/hooks/useSignIn";
import { PhoneInputScreen } from "@/components/PhoneInputScreen";

export default function SignInPage() {
  const { signInWithPhoneNumber, isLoaded } = useSignIn();

  return (
    <PhoneInputScreen
      isLoaded={isLoaded}
      onSubmitPhone={async (phone) => {
        await signInWithPhoneNumber({ phone });
      }}
      heading="Welcome back"
      buttonText="Continue"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkPath="/sign-up/invite-code"
      verifyOtpPath="/sign-in/verify-otp"
    />
  );
}
