import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/lib/actions";
import { getSession } from "@/lib/auth/session";
import { getBucketListIds } from "@/lib/data/users";
import { AuthLinks } from "./AuthLinks";
import { SuggestProductButton } from "./SuggestProductButton";

export async function SiteHeader() {
  const user = await getSession();
  const bucketCount = user ? (await getBucketListIds(user.id)).size : 0;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="FoodMortem home">
          <Image src="/nice.png" alt="" width={40} height={40} priority />
          <span>FoodMortem</span>
        </Link>

        <nav className="site-header__nav" aria-label="Main">
          <Link href="/products">Products</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/categories">Categories</Link>
          <SuggestProductButton />
        </nav>

        <div className="site-header__account">
          {user ? (
            <>
              <Link href="/bucket-list" className="pill">
                Bucket list
                {bucketCount > 0 && <span className="pill__count">{bucketCount}</span>}
              </Link>
              <span className="site-header__user" title={user.name}>
                {user.name}
              </span>
              <form action={signOut}>
                <button type="submit" className="button button--ghost-light">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <AuthLinks />
          )}
        </div>
      </div>
    </header>
  );
}
