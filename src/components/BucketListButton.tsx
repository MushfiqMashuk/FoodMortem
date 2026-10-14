"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOptimistic, useState, useTransition } from "react";
import { setInBucketList } from "@/lib/actions";

interface BucketListButtonProps {
  productId: string;
  signedIn: boolean;
  /** Server truth; the action refreshes the route, which updates this prop. */
  initial: boolean;
  compact?: boolean;
}

export function BucketListButton({ productId, signedIn, initial, compact }: BucketListButtonProps) {
  const pathname = usePathname();
  const [saved, setOptimisticSaved] = useOptimistic(initial);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!signedIn) {
    return (
      <Link className="button button--ghost" href={`/signin?from=${encodeURIComponent(pathname)}`}>
        {compact ? "＋ Bucket list" : "Sign in to save"}
      </Link>
    );
  }

  const toggle = () => {
    const next = !saved;
    setError(null);
    startTransition(async () => {
      setOptimisticSaved(next);
      const result = await setInBucketList(productId, next);
      if (result.status === "error") setError(result.message ?? "Something went wrong.");
    });
  };

  return (
    <>
      <button
        type="button"
        className={`button ${saved ? "button--saved" : "button--ghost"}`}
        aria-pressed={saved}
        disabled={pending}
        onClick={toggle}
      >
        {saved ? "✓ In bucket list" : compact ? "＋ Bucket list" : "＋ Add to bucket list"}
      </button>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
