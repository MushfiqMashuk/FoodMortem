/*
 * Pure domain logic shared by server and client code. No I/O here.
 */

export const REVIEW_TYPES = ["positive", "moderate", "negative"] as const;
export type ReviewType = (typeof REVIEW_TYPES)[number];

export const MIN_RATING = 1;
export const MAX_RATING = 10;

export type ReviewBreakdown = Record<ReviewType, number>;

/**
 * Converts review counts into whole-number percentages that always add up to
 * 100 (largest-remainder method), or all zeros when there are no reviews.
 */
export function reviewPercentages(counts: ReviewBreakdown): ReviewBreakdown {
  const total = REVIEW_TYPES.reduce((sum, type) => sum + counts[type], 0);
  const result: ReviewBreakdown = { positive: 0, moderate: 0, negative: 0 };
  if (total === 0) return result;

  const exact = REVIEW_TYPES.map((type) => ({
    type,
    value: (counts[type] / total) * 100,
  }));
  let remaining = 100;
  for (const { type, value } of exact) {
    result[type] = Math.floor(value);
    remaining -= result[type];
  }
  exact
    .sort((a, b) => (b.value % 1) - (a.value % 1))
    .slice(0, remaining)
    .forEach(({ type }) => (result[type] += 1));
  return result;
}

/** Formats an average rating for display, e.g. 8 -> "8.0", null -> "–". */
export function formatRating(value: number | null | undefined): string {
  return typeof value === "number" ? value.toFixed(1) : "–";
}

/** Rounds an average to one decimal place for storage. */
export function roundRating(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Only allow same-origin relative paths as post-login redirects, so
 * `/signin?from=https://evil.example` can't be used as an open redirect.
 */
export function safeRedirectPath(from: unknown, fallback = "/"): string {
  if (typeof from !== "string") return fallback;
  if (!from.startsWith("/") || from.startsWith("//") || from.startsWith("/\\")) {
    return fallback;
  }
  return from;
}
