"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession, getSession } from "@/lib/auth/session";
import { safeRedirectPath } from "@/lib/domain";
import {
  addReview,
  deleteOwnReview,
  deleteRating,
  upsertRating,
} from "@/lib/data/engagement";
import {
  addToBucketList,
  createSuggestion,
  createUser,
  EmailTakenError,
  findUserForSignIn,
  removeFromBucketList,
} from "@/lib/data/users";
import {
  type ActionState,
  ratingSchema,
  reviewSchema,
  signInSchema,
  signUpSchema,
  suggestionSchema,
  formValues,
  validationError,
} from "@/lib/validation";

/*
 * Every mutation goes through a Server Action. Each one re-derives the user
 * from the verified session cookie; client-supplied user ids are never trusted.
 */

const SIGN_IN_REQUIRED: ActionState = {
  status: "error",
  message: "Please sign in first.",
};

// A real bcrypt hash, compared against when the email is unknown so that
// response timing doesn't reveal which emails are registered.
const DUMMY_HASH = "$2b$12$5rELKBx7pyQJrai9SvJGvuUfCvOWfdlktnPa5kBF8o/Agbk5evk9S";

// ---------------------------------------------------------------- auth

export async function signUp(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationError(parsed.error, formData);

  let user;
  try {
    user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
    });
  } catch (error) {
    if (error instanceof EmailTakenError) {
      return { status: "error", fieldErrors: { email: [error.message] }, values: formValues(formData) };
    }
    throw error;
  }

  await createSession(user);
  redirect(safeRedirectPath(formData.get("from")));
}

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationError(parsed.error, formData);

  const user = await findUserForSignIn(parsed.data.email);
  const valid = await verifyPassword(parsed.data.password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) {
    return { status: "error", message: "Incorrect email or password.", values: formValues(formData) };
  }

  await createSession({ id: user._id.toHexString(), name: user.name });
  redirect(safeRedirectPath(formData.get("from")));
}

export async function signOut(): Promise<void> {
  await deleteSession();
  redirect("/");
}

// ---------------------------------------------------------------- ratings

export async function rateProduct(productId: string, value: number): Promise<ActionState> {
  const user = await getSession();
  if (!user) return SIGN_IN_REQUIRED;

  const parsed = ratingSchema.safeParse({ productId, value });
  if (!parsed.success) return { status: "error", message: "Ratings go from 1 to 10." };

  const saved = await upsertRating(parsed.data.productId, user, parsed.data.value);
  if (!saved) return { status: "error", message: "This product no longer exists." };
  refresh();
  return { status: "success" };
}

export async function removeRating(productId: string): Promise<ActionState> {
  const user = await getSession();
  if (!user) return SIGN_IN_REQUIRED;
  await deleteRating(productId, user.id);
  refresh();
  return { status: "success" };
}

// ---------------------------------------------------------------- reviews

export async function submitReview(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getSession();
  if (!user) return SIGN_IN_REQUIRED;

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationError(parsed.error, formData);

  const { productId, type, body } = parsed.data;
  const saved = await addReview(productId, user, { type, body });
  if (!saved) {
    return { status: "error", message: "This product no longer exists.", values: formValues(formData) };
  }
  refresh();
  return { status: "success", message: "Thanks for your review!" };
}

export async function deleteReview(reviewId: string): Promise<ActionState> {
  const user = await getSession();
  if (!user) return SIGN_IN_REQUIRED;
  const productId = await deleteOwnReview(reviewId, user.id);
  if (!productId) return { status: "error", message: "You can only delete your own reviews." };
  refresh();
  return { status: "success" };
}

// ---------------------------------------------------------------- bucket list

export async function setInBucketList(productId: string, add: boolean): Promise<ActionState> {
  const user = await getSession();
  if (!user) return SIGN_IN_REQUIRED;
  if (add) {
    const saved = await addToBucketList(user.id, productId);
    if (!saved) return { status: "error", message: "This product no longer exists." };
  } else {
    await removeFromBucketList(user.id, productId);
  }
  refresh();
  return { status: "success" };
}

// ---------------------------------------------------------------- suggestions

export async function submitSuggestion(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = suggestionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationError(parsed.error, formData);

  const user = await getSession();
  await createSuggestion({
    productName: parsed.data.productName,
    brandName: parsed.data.brandName,
    location: parsed.data.location || undefined,
    userId: user?.id,
  });
  return { status: "success", message: "Thanks! We'll look into adding it." };
}
