"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOptimistic, useState, useTransition } from "react";
import { rateProduct, removeRating } from "@/lib/actions";
import { formatRating, MAX_RATING, MIN_RATING } from "@/lib/domain";

interface RatingPanelProps {
  productId: string;
  averageRating: number | null;
  ratingCount: number;
  userRating: number | null;
  signedIn: boolean;
}

const SCALE = Array.from({ length: MAX_RATING - MIN_RATING + 1 }, (_, i) => i + MIN_RATING);

export function RatingPanel({ productId, averageRating, ratingCount, userRating, signedIn }: RatingPanelProps) {
  const pathname = usePathname();
  const [mine, setOptimisticMine] = useOptimistic(userRating);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submit = (value: number | null) => {
    setError(null);
    startTransition(async () => {
      setOptimisticMine(value);
      const result = value === null ? await removeRating(productId) : await rateProduct(productId, value);
      if (result.status === "error") setError(result.message ?? "Could not save your rating.");
    });
  };

  const shown = hovered ?? mine;

  return (
    <section className="rating-panel" aria-label="Ratings">
      <div className="rating-panel__stat">
        <span className="eyebrow">Rating</span>
        <p className="rating-panel__value">
          <span className="star" aria-hidden>★</span>
          <strong>{formatRating(averageRating)}</strong>
          <span className="muted">/10</span>
        </p>
        <span className="muted">
          {ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
        </span>
      </div>

      <div className="rating-panel__stat">
        <span className="eyebrow">Your rating</span>
        {signedIn ? (
          <>
            <div
              className="rating-scale"
              role="radiogroup"
              aria-label="Your rating out of 10"
              onMouseLeave={() => setHovered(null)}
            >
              {SCALE.map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={mine === value}
                  aria-label={`${value} out of 10`}
                  className={`rating-scale__star${shown !== null && value <= shown ? " is-on" : ""}`}
                  disabled={pending}
                  onMouseEnter={() => setHovered(value)}
                  onFocus={() => setHovered(value)}
                  onBlur={() => setHovered(null)}
                  onClick={() => submit(value)}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="muted">
              {mine ? (
                <>
                  You rated it <strong>{mine}/10</strong>.{" "}
                  <button type="button" className="link-button" disabled={pending} onClick={() => submit(null)}>
                    Remove
                  </button>
                </>
              ) : (
                "Tap a star to rate."
              )}
            </p>
          </>
        ) : (
          <Link className="button button--ghost" href={`/signin?from=${encodeURIComponent(pathname)}`}>
            Sign in to rate
          </Link>
        )}
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
