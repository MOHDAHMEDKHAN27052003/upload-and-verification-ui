'use client';

import { SubmitEvent, useState } from 'react';
import { sendOtp } from './api';

export default function SendOtpUi() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await sendOtp({ email });
      setMessage(response.message);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Send OTP
        </h1>
        <p className="mb-6 text-sm text-muted-fg">
          Enter your email address to receive a one-time password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@example.domain"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent px-4 py-2 font-semibold text-accent-fg transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send OTP'}
          </button>
        </form>

        {message && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-success/10 px-3 py-2 text-sm text-success"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}