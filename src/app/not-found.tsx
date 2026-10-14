import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty-state">
      <Image src="/no_data.svg" alt="" width={200} height={150} />
      <h1>Nothing here</h1>
      <p>That page, product or brand doesn&apos;t exist.</p>
      <Link className="button button--primary" href="/">
        Back to home
      </Link>
    </div>
  );
}
