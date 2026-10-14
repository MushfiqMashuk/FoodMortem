"use client";

import { useState, useTransition } from "react";
import { deleteReview } from "@/lib/actions";

export function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onDelete = () => {
    if (!window.confirm("Delete this review?")) return;
    startTransition(async () => {
      const result = await deleteReview(reviewId);
      if (result.status === "error") setError(result.message ?? "Could not delete the review.");
    });
  };

  return (
    <div className="review__actions">
      <button type="button" className="link-button link-button--danger" disabled={pending} onClick={onDelete}>
        {pending ? "Deleting…" : "Delete"}
      </button>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
