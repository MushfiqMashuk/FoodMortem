import Image from "next/image";
import type { ReactNode } from "react";
import { FALLBACK_IMAGE } from "@/lib/images";

interface EntityHeaderProps {
  eyebrow: string;
  title: string;
  img?: string | null;
  children?: ReactNode;
}

/** Page header for brand and category pages. */
export function EntityHeader({ eyebrow, title, img, children }: EntityHeaderProps) {
  return (
    <header className="entity-header">
      {img !== undefined && (
        <div className="entity-header__image">
          <Image src={img ?? FALLBACK_IMAGE} alt="" fill sizes="96px" />
        </div>
      )}
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </div>
    </header>
  );
}
