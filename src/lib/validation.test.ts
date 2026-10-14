import { describe, expect, it } from "vitest";
import { formValues, ratingSchema, reviewSchema, signUpSchema, suggestionSchema } from "./validation";

const productId = "64b7f0c2a1b2c3d4e5f60718";

describe("signUpSchema", () => {
  it("normalises email and trims the name", () => {
    const result = signUpSchema.parse({ name: "  Mashuk ", email: " Me@Example.COM ", password: "longenough" });
    expect(result).toEqual({ name: "Mashuk", email: "me@example.com", password: "longenough" });
  });

  it("rejects short passwords", () => {
    const result = signUpSchema.safeParse({ name: "Mashuk", email: "me@example.com", password: "short" });
    expect(result.success).toBe(false);
  });
});

describe("ratingSchema", () => {
  it("accepts integers from 1 to 10", () => {
    expect(ratingSchema.parse({ productId, value: "7" }).value).toBe(7);
  });

  it.each([0, 11, 5.5, "abc"])("rejects %s", (value) => {
    expect(ratingSchema.safeParse({ productId, value }).success).toBe(false);
  });

  it("rejects malformed product ids", () => {
    expect(ratingSchema.safeParse({ productId: "../etc", value: 5 }).success).toBe(false);
  });
});

describe("reviewSchema", () => {
  it("requires a known review type", () => {
    const result = reviewSchema.safeParse({ productId, type: "amazing", body: "Really really good." });
    expect(result.success).toBe(false);
  });

  it("does not accept extra fields such as userId", () => {
    const result = reviewSchema.parse({
      productId,
      type: "positive",
      body: "Really really good.",
      userId: "someone-else",
    });
    expect(result).not.toHaveProperty("userId");
  });
});

describe("suggestionSchema", () => {
  it("treats location as optional", () => {
    expect(suggestionSchema.safeParse({ productName: "Fuchka", brandName: "Street" }).success).toBe(true);
    expect(suggestionSchema.safeParse({ productName: "Fuchka", brandName: "Street", location: "" }).success).toBe(true);
  });
});

describe("formValues", () => {
  it("echoes text fields but never passwords or React internals", () => {
    const data = new FormData();
    data.set("email", "me@example.com");
    data.set("password", "hunter22");
    data.set("$ACTION_ID_abc", "");
    expect(formValues(data)).toEqual({ email: "me@example.com" });
  });
});
