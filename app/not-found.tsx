import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <h1 id="not-found-title">404 - this page was never deployed</h1>
      <Link href="/">-&gt; /</Link>
    </section>
  );
}
