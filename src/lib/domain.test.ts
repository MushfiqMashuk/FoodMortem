import { describe, expect, it } from "vitest";
import { formatRating, reviewPercentages, roundRating, safeRedirectPath } from "./domain";

describe("reviewPercentages", () => {
  it("returns zeros when there are no reviews", () => {
    expect(reviewPercentages({ positive: 0, moderate: 0, negative: 0 })).toEqual({
      positive: 0,
      moderate: 0,
      negative: 0,
    });
  });

  it("always sums to 100", () => {
    const result = reviewPercentages({ positive: 1, moderate: 1, negative: 1 });
    expect(result.positive + result.moderate + result.negative).toBe(100);
    expect(result).toEqual({ positive: 34, moderate: 33, negative: 33 });
  });

  it("gives the rounding remainder to the largest fractions", () => {
    expect(reviewPercentages({ positive: 2, moderate: 1, negative: 0 })).toEqual({
      positive: 67,
      moderate: 33,
      negative: 0,
    });
  });
});

describe("formatRating", () => {
  it("formats numbers with one decimal and handles missing ratings", () => {
    expect(formatRating(8)).toBe("8.0");
    expect(formatRating(7.25)).toBe("7.3");
    expect(formatRating(null)).toBe("–");
    expect(formatRating(undefined)).toBe("–");
  });
});

describe("roundRating", () => {
  it("rounds to one decimal place", () => {
    expect(roundRating(23 / 3)).toBe(7.7);
    expect(roundRating(10)).toBe(10);
  });
});

describe("safeRedirectPath", () => {
  it("allows same-origin relative paths", () => {
    expect(safeRedirectPath("/products/abc?x=1")).toBe("/products/abc?x=1");
  });

  it.each([
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    "",
    undefined,
    42,
  ])("rejects %s", (value) => {
    expect(safeRedirectPath(value)).toBe("/");
  });
});
