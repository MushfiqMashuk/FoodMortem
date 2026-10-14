import "server-only";
import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters"),
  FEATURED_CATEGORIES: z.string().default("kacchi,burger,pizza"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

/**
 * Validated server environment. Parsed lazily so that `next build` does not
 * require secrets; the first request that needs them fails loudly instead.
 */
export function env(): Env {
  if (!cached) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      throw new Error(
        `Invalid environment configuration:\n${z.prettifyError(result.error)}`,
      );
    }
    cached = result.data;
  }
  return cached;
}

export function featuredCategories(): string[] {
  return env()
    .FEATURED_CATEGORIES.split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}
