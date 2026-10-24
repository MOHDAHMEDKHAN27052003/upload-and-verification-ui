// components/FeedbackMessage.tsx
"use client";

import { ReactNode } from "react";

export type FeedbackType = "success" | "error";

export interface FeedbackMessageProps {
  type: FeedbackType;
  children: ReactNode;
  className?: string;
}

const typeStyles: Record<FeedbackType, string> = {
  success: "bg-secondary/10 text-secondary border-secondary/30",
  error: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function FeedbackMessage({
  type,
  children,
  className = "",
}: FeedbackMessageProps) {
  return (
    <div
      role="alert"
      className={`px-4 py-3 rounded-md text-sm border ${typeStyles[type]} ${className}`}
    >
      {children}
    </div>
  );
}