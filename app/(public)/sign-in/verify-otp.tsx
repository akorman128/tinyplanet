import { useSignIn } from "@/hooks/useSignIn";
import { OtpVerificationScreen } from "@/components/OtpVerificationScreen";

export default function VerifyOtp() {
  const { verifyOtp, isLoaded } = useSignIn();

  return (
    <OtpVerificationScreen
      isLoaded={isLoaded}
      onVerifyOtp={async (phone, token) => {
        await verifyOtp({ phone, token });
      }}
    />
  );
}
