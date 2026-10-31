"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    loading?: boolean;
    loadingText?: string;
    fullWidth?: boolean;
}

export default function Button({
    children,
    loading = false,
    loadingText,
    fullWidth = true,
    disabled,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className={[
                fullWidth ? "w-full" : "",
                "rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground",
                "transition-colors hover:bg-primary/90",
                "focus:outline-none focus:ring-2 focus:ring-primary/40",
                "disabled:cursor-not-allowed disabled:opacity-60",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            {...props}
        >
            {loading && loadingText ? loadingText : children}
        </button>
    );
}