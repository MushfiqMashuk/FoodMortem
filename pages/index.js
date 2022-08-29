import Link from "next/link";

export default function Home() {
  return (
    <div>
      Go to
      <Link href="/products">
        <a> Product </a>
      </Link>
      page
    </div>
  );
}
