import { router } from "expo-router";
import { useSignUp } from "@/hooks/useSignUp";
import { OtpVerificationScreen } from "@/components/OtpVerificationScreen";

export default function Page() {
  const { verifyOtpAndCreateProfile, signUpWithPhoneNumber, isLoaded } =
    useSignUp();

  return (
    <OtpVerificationScreen
      isLoaded={isLoaded}
      onVerifyOtp={async (phone, token) => {
        await verifyOtpAndCreateProfile({ phone, token });
        // Navigate to send invites page after successful verification
        // router.replace("/onboarding/send-invites");
      }}
      onResendCode={async (phone) => {
        await signUpWithPhoneNumber({ phone });
      }}
    />
  );
}
