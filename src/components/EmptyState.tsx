import Image from "next/image";
import type { ReactNode } from "react";

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="empty-state">
      <Image src="/no_product.svg" alt="" width={160} height={120} />
      <div>{children}</div>
    </div>
  );
}
