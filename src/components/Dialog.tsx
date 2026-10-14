"use client";

import { type ReactNode, useEffect, useRef } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/** Thin wrapper over the native <dialog> element (focus trap, Esc, backdrop). */
export function Dialog({ open, onClose, title, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog__header">
        <h2 id="dialog-title">{title}</h2>
        <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      {open && children}
    </dialog>
  );
}
