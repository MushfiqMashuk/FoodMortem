import type { ActionState } from "@/lib/validation";

export function FieldError({ state, name }: { state: ActionState; name: string }) {
  const errors = state.status === "error" ? state.fieldErrors?.[name] : undefined;
  if (!errors?.length) return null;
  return (
    <p className="field-error" id={`${name}-error`} role="alert">
      {errors[0]}
    </p>
  );
}

export function FormMessage({ state }: { state: ActionState }) {
  if (state.status === "idle" || !state.message) return null;
  return (
    <p className={state.status === "error" ? "form-error" : "form-success"} role="status">
      {state.message}
    </p>
  );
}

export function hasError(state: ActionState, name: string): boolean {
  return state.status === "error" && Boolean(state.fieldErrors?.[name]?.length);
}

/** The value submitted last time, so a failed submission keeps what was typed. */
export function lastValue(state: ActionState, name: string): string | undefined {
  return state.status === "error" ? state.values?.[name] : undefined;
}
