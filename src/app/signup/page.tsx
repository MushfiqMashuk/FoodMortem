import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getSession } from "@/lib/auth/session";
import { safeRedirectPath } from "@/lib/domain";

export const metadata: Metadata = { title: "Sign up" };

export default async function SignUpPage({ searchParams }: PageProps<"/signup">) {
  const from = safeRedirectPath((await searchParams).from);
  if (await getSession()) redirect(from);
  return (
    <div className="auth-page">
      <AuthForm mode="signup" from={from} />
    </div>
  );
}
