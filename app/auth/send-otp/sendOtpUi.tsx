"use client";

import { SubmitEvent, useState } from "react";
import { sendOtpApi } from "./sendOtpApi";
import FeedbackMessage from "@/components/FeedbackMessage";

export default function SendOtpUi() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await sendOtpApi({ email });

    if (result.success) {
      setMessage({
        type: "success",
        text: result.data?.message ?? "OTP sent successfully",
      });
      setEmail("");
    } else {
      setMessage({
        type: "error",
        text: result.error ?? "Something went wrong. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Send OTP</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email address and we'll send you a one-time password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-foreground"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          {message && (
            <FeedbackMessage type={message.type} className="mt-5">
              {message.text}
            </FeedbackMessage>
          )}
        </div>
      </div>
    </main>
  );
}