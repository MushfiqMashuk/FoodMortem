import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { listBrands } from "@/lib/data/catalog";
import { FALLBACK_IMAGE } from "@/lib/images";

export const metadata: Metadata = { title: "Brands" };

export default async function BrandsPage() {
  const brands = await listBrands();
  return (
    <>
      <h1>Brands</h1>
      {brands.length === 0 ? (
        <EmptyState>No brands yet.</EmptyState>
      ) : (
        <ul className="tile-grid">
          {brands.map((brand) => (
            <li key={brand.id}>
              <Link href={`/brands/${brand.id}`} className="card tile">
                <span className="tile__image">
                  <Image src={brand.img ?? FALLBACK_IMAGE} alt="" fill sizes="64px" />
                </span>
                <span className="tile__name">{brand.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
