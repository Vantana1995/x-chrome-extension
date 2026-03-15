"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken, saveUser, getMe } from "../../lib/api";
import { Suspense } from "react";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      router.push("/");
      return;
    }

    saveToken(token);

    getMe().then((user) => {
      if (user) saveUser(user);
      router.push("/interests");
    });
  }, [router, searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-2 h-2 bg-[#1a1a1a] dark:bg-[#f5f0e8] animate-pulse mx-auto mb-4" />
        <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
          Connecting...
        </p>
      </div>
    </main>
  );
}

export default function CallbackPage() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  );
}
