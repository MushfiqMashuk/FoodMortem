"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { submitReview } from "@/lib/actions";
import { REVIEW_TYPES } from "@/lib/domain";
import { idle } from "@/lib/validation";
import { Dialog } from "./Dialog";
import { FieldError, FormMessage, hasError, lastValue } from "./FormFields";

interface WriteReviewButtonProps {
  productId: string;
  productName: string;
  signedIn: boolean;
}

export function WriteReviewButton({ productId, productName, signedIn }: WriteReviewButtonProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!signedIn) {
    return (
      <Link className="button" href={`/signin?from=${encodeURIComponent(pathname)}`}>
        Sign in to write a review
      </Link>
    );
  }

  return (
    <>
      <button type="button" className="button" onClick={() => setOpen(true)}>
        Write a review
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title={`Review ${productName}`}>
        <ReviewForm productId={productId} onDone={() => setOpen(false)} />
      </Dialog>
    </>
  );
}

function ReviewForm({ productId, onDone }: { productId: string; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(submitReview, idle);

  useEffect(() => {
    if (state.status === "success") onDone();
  }, [state, onDone]);

  return (
    <form action={formAction} className="form">
      <input type="hidden" name="productId" value={productId} />
      <fieldset className="radio-group" aria-invalid={hasError(state, "type")}>
        <legend>
          Verdict <span className="required">*</span>
        </legend>
        {REVIEW_TYPES.map((type) => (
          <label key={type} className={`radio radio--${type}`}>
            <input type="radio" name="type" value={type} required defaultChecked={lastValue(state, "type") === type} />
            {type}
          </label>
        ))}
      </fieldset>
      <FieldError state={state} name="type" />

      <label className="field">
        <span>
          Your review <span className="required">*</span>
        </span>
        <textarea
          name="body"
          defaultValue={lastValue(state, "body")}
          rows={6}
          minLength={10}
          maxLength={2000}
          required
          placeholder="How was it? Taste, portion, price…"
          aria-invalid={hasError(state, "body")}
          aria-describedby="body-error"
        />
      </label>
      <FieldError state={state} name="body" />
      <FormMessage state={state} />

      <button type="submit" className="button button--primary" disabled={pending}>
        {pending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
