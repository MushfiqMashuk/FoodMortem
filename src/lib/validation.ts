import { z } from "zod";
import { MAX_RATING, MIN_RATING, REVIEW_TYPES } from "@/lib/domain";

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");

// Trim and lowercase before validating, so " Me@Example.com " is accepted.
const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email"));

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(60, "Name is too long"),
  email,
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .max(128, "Password is too long"),
});

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password").max(128),
});

export const ratingSchema = z.object({
  productId: objectId,
  value: z.coerce.number().int().min(MIN_RATING).max(MAX_RATING),
});

export const reviewSchema = z.object({
  productId: objectId,
  type: z.enum(REVIEW_TYPES, "Choose a review type"),
  body: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters")
    .max(2000, "Keep it under 2000 characters"),
});

export const suggestionSchema = z.object({
  productName: z.string().trim().min(2, "Product name is required").max(120),
  brandName: z.string().trim().min(2, "Brand name is required").max(120),
  location: z.string().trim().max(200).optional().or(z.literal("")),
});

export type FieldErrors = Partial<Record<string, string[]>>;

/** Result returned by every form Server Action, consumed via useActionState. */
export type ActionState =
  | { status: "idle" }
  | { status: "success"; message?: string }
  | {
      status: "error";
      message?: string;
      fieldErrors?: FieldErrors;
      /** Submitted values to refill the form (React 19 resets forms after an action). */
      values?: Record<string, string>;
    };

export const idle: ActionState = { status: "idle" };

/** Echoes text fields back to the client, never passwords. */
export function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData) {
    if (typeof value === "string" && !key.startsWith("$") && !/password/i.test(key)) {
      values[key] = value;
    }
  }
  return values;
}

export function validationError(error: z.ZodError, formData: FormData): ActionState {
  return {
    status: "error",
    fieldErrors: z.flattenError(error).fieldErrors as FieldErrors,
    values: formValues(formData),
  };
}
