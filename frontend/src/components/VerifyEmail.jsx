import { useMemo, useRef, useState } from "react";
import { Loader2, MailCheck, RotateCcw, ShieldCheck } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function VerifyEmail() {
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const { pendingVerificationEmail, verifyEmail, resendVerificationOtp, isVerifyingEmail, isResendingOtp } = useAuthStore();

  const otp = useMemo(() => digits.join(""), [digits]);

  const updateDigit = (index, value) => {
    const nextValue = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = nextValue;
    setDigits(nextDigits);

    if (nextValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedOtp = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedOtp) return;

    const nextDigits = Array(6).fill("");
    pastedOtp.split("").forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    setDigits(nextDigits);
    inputRefs.current[Math.min(pastedOtp.length, 5)]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (otp.length !== 6) return;
    await verifyEmail(otp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MailCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Verify your email</h1>
          <p className="text-sm sm:text-base text-base-content/60 mt-2">
            We sent a 6-digit code to {pendingVerificationEmail}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-base-100 p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                className="input input-bordered h-12 w-full px-0 text-center text-lg font-semibold sm:h-14 sm:text-xl"
                value={digit}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-sm sm:text-base"
            disabled={isVerifyingEmail || otp.length !== 6}
          >
            {isVerifyingEmail ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" />
                Verify Email
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-ghost w-full text-sm sm:text-base"
            onClick={resendVerificationOtp}
            disabled={isResendingOtp}
          >
            {isResendingOtp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RotateCcw className="h-5 w-5" />
                Resend OTP
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
