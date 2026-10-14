"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sign in / sign up links that return the user to the current page. */
export function AuthLinks() {
  const pathname = usePathname();
  const from = pathname === "/signin" || pathname === "/signup" ? "/" : pathname;
  const query = `?from=${encodeURIComponent(from)}`;
  return (
    <>
      <Link href={`/signin${query}`} className="button button--ghost-light">
        Sign in
      </Link>
      <Link href={`/signup${query}`} className="button button--light">
        Sign up
      </Link>
    </>
  );
}
