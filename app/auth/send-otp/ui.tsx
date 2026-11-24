'use client';

import { SubmitEvent, useEffect, useState } from 'react';
import { sendOtp } from './api';
import { inputStyles, labelStyles } from '@/styles/form';
import {
  descriptionStyles,
  errorMessageStyles,
  headingStyles,
  successMessageStyles,
} from '@/styles/text';
import { buttonStyles } from '@/styles/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEmail } from '@/store/slice/otpSlice';
import { useRouter } from 'next/navigation';

export default function SendOtpUi() {
  const dispatch = useAppDispatch();
  // Read the persisted email from Redux
  const email = useAppSelector((state) => state.otp.email);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/users/profile');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null; // or a spinner

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await sendOtp({ email });
      setMessage(response.message);
      router.push('/auth/verify-otp');
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className={headingStyles}>Send OTP</h1>
        <p className={descriptionStyles}>
          Enter your email address to receive a one-time password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className={labelStyles}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className={inputStyles}
            />
          </div>

          <button type="submit" disabled={loading} className={buttonStyles}>
            {loading ? 'Sending…' : 'Send OTP'}
          </button>
        </form>

        {message && (
          <p role="status" className={successMessageStyles}>
            {message}
          </p>
        )}

        {error && (
          <p role="alert" className={errorMessageStyles}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}