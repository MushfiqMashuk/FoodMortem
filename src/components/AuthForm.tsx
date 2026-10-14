"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, signUp } from "@/lib/actions";
import { idle } from "@/lib/validation";
import { FieldError, FormMessage, hasError, lastValue } from "./FormFields";

interface AuthFormProps {
  mode: "signin" | "signup";
  from: string;
}

export function AuthForm({ mode, from }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(mode === "signin" ? signIn : signUp, idle);
  const isSignUp = mode === "signup";
  const otherHref = `/${isSignUp ? "signin" : "signup"}?from=${encodeURIComponent(from)}`;

  return (
    <form action={formAction} className="form card auth-form">
      <h1>{isSignUp ? "Create your account" : "Welcome back"}</h1>
      <input type="hidden" name="from" value={from} />

      {isSignUp && (
        <>
          <label className="field">
            <span>Name</span>
            <input name="name" defaultValue={lastValue(state, "name")} autoComplete="name" required minLength={2} maxLength={60} aria-invalid={hasError(state, "name")} />
          </label>
          <FieldError state={state} name="name" />
        </>
      )}

      <label className="field">
        <span>Email</span>
        <input name="email" type="email" defaultValue={lastValue(state, "email")} autoComplete="email" required aria-invalid={hasError(state, "email")} />
      </label>
      <FieldError state={state} name="email" />

      <label className="field">
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          minLength={isSignUp ? 8 : 1}
          maxLength={128}
          aria-invalid={hasError(state, "password")}
        />
      </label>
      <FieldError state={state} name="password" />
      <FormMessage state={state} />

      <button type="submit" className="button button--primary" disabled={pending}>
        {pending ? "Please wait…" : isSignUp ? "Sign up" : "Sign in"}
      </button>

      <p className="muted">
        {isSignUp ? "Already have an account? " : "New to FoodMortem? "}
        <Link href={otherHref}>{isSignUp ? "Sign in" : "Create an account"}</Link>
      </p>
    </form>
  );
}
