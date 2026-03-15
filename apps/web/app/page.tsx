"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "./lib/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.push("/interests");
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`;
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto px-8 py-16 w-full">
        <div className="mb-16">
          <div className="w-3 h-12 bg-[#1a1a1a] dark:bg-[#f5f0e8] mb-8" />
          <h1 className="text-6xl font-black uppercase tracking-tight leading-none mb-4">
            Interest
            <br />
            Badge
          </h1>
          <p className="text-xl text-[var(--muted)] font-light max-w-md">
            Let people know what you care about. See what others are into.
          </p>
        </div>

        <div className="mb-16">
          <div className="border border-[var(--border)] p-6 mb-4">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
              How it works
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-black mb-1">01</div>
                <div className="text-sm text-[var(--muted)]">
                  Connect your Twitter account
                </div>
              </div>
              <div>
                <div className="text-2xl font-black mb-1">02</div>
                <div className="text-sm text-[var(--muted)]">
                  Pick up to 5 interests
                </div>
              </div>
              <div>
                <div className="text-2xl font-black mb-1">03</div>
                <div className="text-sm text-[var(--muted)]">
                  Install the extension
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#1a1a1a] dark:bg-[#f5f0e8] text-[#f5f0e8] dark:text-[#1a1a1a] py-5 text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          Connect with Twitter →
        </button>
      </div>
    </main>
  );
}
