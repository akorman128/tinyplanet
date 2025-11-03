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
      }}
      onResendCode={async (phone) => {
        await signUpWithPhoneNumber({ phone });
      }}
    />
  );
}
