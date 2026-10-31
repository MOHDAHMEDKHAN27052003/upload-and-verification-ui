"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { sendOtpApi } from "./api";
import FormError from "@/components/FormError";

export default function SendOtpUi() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await sendOtpApi({ email });

        if (result.success) {
            router.push('/auth/verify-otp');
        }

        setError(result.message);
        setLoading(false);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
            <div className="w-full max-w-md">
                <div className="rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Verify Your Email
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter your email address and we&apos;ll send you a one-time code.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                            />
                        </div>
                        <button
                            disabled={loading || !email}
                            className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Sending code..." : "Send verification code"}
                        </button>

                        <FormError message={error} />
                    </form>
                </div>
            </div>
        </main>
    );
}