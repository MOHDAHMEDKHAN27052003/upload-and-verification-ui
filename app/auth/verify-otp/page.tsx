'use client';

import { ClipboardEvent, KeyboardEvent, SubmitEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks'; // adjust path
import { clearEmail } from '@/store/otpSlice'; // adjust path
import { verifyOtp, VerifyOtpError } from './api';

const OTP_LENGTH = 6;

export default function VerifyOtpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.otp.email);

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Guard: if no email in store, send user back to the email-entry step
  useEffect(() => {
    if (!email) {
      router.replace('/auth/send-otp'); // adjust to your flow
    }
  }, [email, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // digits only, single char

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill('');
    pasted
      .slice(0, OTP_LENGTH)
      .split('')
      .forEach((char, i) => (next[i] = char));
    setOtp(next);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const otpCode = otp.join('');
    if (otpCode.length !== OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await verifyOtp({
        email,
        otp: Number(otpCode),
      });
      setSuccess(res.message || 'OTP verified successfully');
      dispatch(clearEmail());

      // Redirect to the reset-password step (adjust route as needed)
      setTimeout(() => {
        router.push('/users/profile');
      }, 800);
    } catch (err) {
      const apiError = err as VerifyOtpError;
      setError(apiError.message || 'Invalid OTP. Please try again.');
      setOtp(Array(OTP_LENGTH).fill(''));
      inputsRef.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card text-card-fg border border-border rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-primary">
              Verify your OTP
            </h1>
            <p className="mt-2 text-sm text-muted-fg">
              We sent a 6-digit code to{' '}
              <span className="font-medium text-foreground">
                {email || 'your email'}
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  disabled={isSubmitting}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg border border-border bg-background
                             text-center text-xl font-semibold text-foreground
                             focus:border-accent focus:ring-2 focus:ring-ring focus:outline-none
                             disabled:opacity-60 transition"
                />
              ))}
            </div>

            {/* Feedback */}
            {error && (
              <p
                role="alert"
                className="text-sm text-center text-danger bg-danger/10 rounded-md py-2 px-3"
              >
                {error}
              </p>
            )}
            {success && (
              <p
                role="status"
                className="text-sm text-center text-success bg-success/10 rounded-md py-2 px-3"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg
                         bg-accent text-accent-fg font-semibold py-3 px-4
                         hover:opacity-90 active:opacity-80 transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying…' : 'Verify OTP'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-fg">
            Didn&apos;t receive the code? Check your spam folder or{' '}
            <button
              type="button"
              className="text-secondary font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              onClick={() => router.back()}
            >
              request a new one
            </button>
            .
          </p>
        </div>
      </div>
    </main>
  );
}