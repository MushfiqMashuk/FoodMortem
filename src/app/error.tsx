"use client";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="empty-state">
      <h1>Something went wrong</h1>
      <p className="muted">
        We couldn&apos;t load this page. {error.digest && <>Reference: <code>{error.digest}</code></>}
      </p>
      <button type="button" className="button button--primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
