"use client";

import { useActionState, useState } from "react";
import { submitSuggestion } from "@/lib/actions";
import { idle } from "@/lib/validation";
import { Dialog } from "./Dialog";
import { FieldError, FormMessage, hasError, lastValue } from "./FormFields";

export function SuggestProductButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="nav-button" onClick={() => setOpen(true)}>
        Suggest a product
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Suggest a product">
        <SuggestionForm />
      </Dialog>
    </>
  );
}

function SuggestionForm() {
  const [state, formAction, pending] = useActionState(submitSuggestion, idle);

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form action={formAction} className="form">
      <p className="muted">Can&apos;t find something? Tell us and we&apos;ll add it.</p>
      <label className="field">
        <span>
          Product name <span className="required">*</span>
        </span>
        <input name="productName" defaultValue={lastValue(state, "productName")} required maxLength={120} aria-invalid={hasError(state, "productName")} />
      </label>
      <FieldError state={state} name="productName" />

      <label className="field">
        <span>
          Brand name <span className="required">*</span>
        </span>
        <input name="brandName" defaultValue={lastValue(state, "brandName")} required maxLength={120} aria-invalid={hasError(state, "brandName")} />
      </label>
      <FieldError state={state} name="brandName" />

      <label className="field">
        <span>Where to find it</span>
        <input name="location" defaultValue={lastValue(state, "location")} maxLength={200} placeholder="Shop, area or website (optional)" />
      </label>
      <FieldError state={state} name="location" />
      <FormMessage state={state} />

      <button type="submit" className="button button--primary" disabled={pending}>
        {pending ? "Sending…" : "Send suggestion"}
      </button>
    </form>
  );
}
