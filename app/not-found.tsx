import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404 - this page was never deployed</p>
      <Link href="/">-&gt; /</Link>
    </main>
  );
}
