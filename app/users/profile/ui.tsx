"use client";

import { useEffect, useState } from "react";
import { getMe, type User } from "./api";
import { descriptionStyles, headingStyles } from "@/styles/text";

export default function ProfileUi() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        return;
      }
    }

    fetchProfile();
    return () => {};
  }, []);

  if (!user) return null;

  const initials = user.email.charAt(0).toUpperCase();
  const joined = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className={headingStyles}>
            My Profile
          </h1>
          <p className={descriptionStyles}>
            Manage your account details and view your membership.
          </p>
        </header>

        {/* Profile card */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-col items-center gap-4 border-b border-border bg-muted px-6 py-8 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-fg">
              {initials}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold text-card-fg">{user.email}</h2>
              <span className="mt-1 inline-flex items-center rounded-full bg-secondary/15 px-3 py-0.5 text-xs font-medium capitalize text-secondary">
                {user.role}
              </span>
            </div>
          </div>

          {/* Detail rows */}
          <dl className="divide-y divide-border">
            <div className="flex items-center justify-between px-6 py-4">
              <dt className="text-sm font-medium text-muted-fg">User ID</dt>
              <dd className="max-w-[60%] truncate font-mono text-sm text-card-fg">
                {user._id}
              </dd>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <dt className="text-sm font-medium text-muted-fg">Email</dt>
              <dd className="text-sm text-card-fg">{user.email}</dd>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <dt className="text-sm font-medium text-muted-fg">Role</dt>
              <dd className="text-sm capitalize text-card-fg">{user.role}</dd>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <dt className="text-sm font-medium text-muted-fg">Joined</dt>
              <dd className="text-sm text-card-fg">{joined}</dd>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <dt className="text-sm font-medium text-muted-fg">Last updated</dt>
              <dd className="text-sm text-card-fg">
                {new Date(user.updatedAt).toLocaleString()}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}