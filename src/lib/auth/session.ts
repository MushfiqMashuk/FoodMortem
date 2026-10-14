import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { env } from "@/lib/env";

const COOKIE_NAME = "fm_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const ALGORITHM = "HS256";

export interface SessionUser {
  id: string;
  name: string;
}

function secretKey(): Uint8Array {
  return new TextEncoder().encode(env().SESSION_SECRET);
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({ name: user.name })
    .setProtectedHeader({ alg: ALGORITHM })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: env().NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

/**
 * The signed-in user for this request, verified on the server. Memoised per
 * request with React `cache`, so layouts, pages and actions can all call it.
 */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: [ALGORITHM],
    });
    if (typeof payload.sub !== "string" || typeof payload.name !== "string") {
      return null;
    }
    return { id: payload.sub, name: payload.name };
  } catch {
    return null;
  }
});

/** For pages that need a user: redirects to sign-in and back afterwards. */
export async function requireSession(returnTo: string): Promise<SessionUser> {
  const user = await getSession();
  if (!user) redirect(`/signin?from=${encodeURIComponent(returnTo)}`);
  return user;
}
