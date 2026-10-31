"use client";

interface FormErrorProps {
    message?: string | null;
    className?: string;
}

export default function FormError({ message, className = "" }: FormErrorProps) {
    if (!message) return null;

    return (
        <div
            role="alert"
            className={`rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive ${className}`}
        >
            {message}
        </div>
    );
}