import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getSession } from "@/lib/auth/session";
import { safeRedirectPath } from "@/lib/domain";

export const metadata: Metadata = { title: "Sign in" };

export default async function SignInPage({ searchParams }: PageProps<"/signin">) {
  const from = safeRedirectPath((await searchParams).from);
  if (await getSession()) redirect(from);
  return (
    <div className="auth-page">
      <AuthForm mode="signin" from={from} />
    </div>
  );
}
