import { useSignUp } from "@/hooks/useSignUp";
import { PhoneInputScreen } from "@/components/PhoneInputScreen";

export default function Page() {
  const { signUpWithPhoneNumber, isLoaded } = useSignUp();

  return (
    <PhoneInputScreen
      isLoaded={isLoaded}
      onSubmitPhone={async (phone) => {
        await signUpWithPhoneNumber({ phone });
      }}
      heading="Create your account"
      subheading="Enter your phone number to get started"
      buttonText="Continue"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkPath="/sign-in/sign-in"
      verifyOtpPath="/sign-up/verify-otp"
    />
  );
}
