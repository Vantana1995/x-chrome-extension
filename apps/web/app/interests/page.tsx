"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser, getCategories, updateInterests } from "../lib/api";

interface Category {
  id: string;
  name: string;
  groupName: string;
}

export default function InterestsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Record<string, Category[]>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const user = getUser();

  useEffect(() => {
    if (!getToken()) {
      router.push("/");
      return;
    }

    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, [router]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 5) return prev;
        next.add(id);
      }
      return next;
    });
  }

  async function save() {
    setSaving(true);
    await updateInterests(Array.from(selected));
    setSaving(false);
    setSaved(true);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-8 py-16">
      <div className="mb-12">
        <div className="w-3 h-8 bg-[#1a1a1a] dark:bg-[#f5f0e8] mb-6" />
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
          Your Interests
        </h1>
        {user && (
          <p className="text-[var(--muted)] text-sm">@{user.username}</p>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
          Select up to 5
        </p>
        <p className="text-xs uppercase tracking-widest font-bold">
          {selected.size}/5
        </p>
      </div>

      {Object.entries(categories).map(([group, items]) => (
        <div key={group} className="mb-8">
          <div className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3 border-b border-[var(--border)] pb-2">
            {group}
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((cat) => {
              const isSelected = selected.has(cat.id);
              const isDisabled = !isSelected && selected.size >= 5;
              return (
                <button
                  key={cat.id}
                  onClick={() => !isDisabled && toggle(cat.id)}
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-wide border transition-all ${
                    isSelected
                      ? "bg-[#1a1a1a] dark:bg-[#f5f0e8] text-[#f5f0e8] dark:text-[#1a1a1a] border-[#1a1a1a] dark:border-[#f5f0e8]"
                      : isDisabled
                        ? "border-[var(--border)] text-[var(--muted)] opacity-30 cursor-not-allowed"
                        : "border-[var(--border)] hover:border-[#1a1a1a] dark:hover:border-[#f5f0e8]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-12">
        {saved ? (
          <div className="border border-[var(--border)] p-6">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
              Done
            </div>
            <p className="font-bold mb-4">
              Interests saved. Install the extension to see badges on Twitter.
            </p>
            <a
              href="https://github.com/Vantana1995/x-chrome-extension/releases"
              className="text-sm uppercase tracking-widest underline"
            >
              Install Chrome Extension
            </a>
          </div>
        ) : (
          <button
            onClick={save}
            disabled={selected.size === 0 || saving}
            className="w-full bg-[#1a1a1a] dark:bg-[#f5f0e8] text-[#f5f0e8] dark:text-[#1a1a1a] py-5 text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-30"
          >
            {saving ? "Saving..." : "Save Interests"}
          </button>
        )}
      </div>
    </main>
  );
}
