import type { Metadata } from "next";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Megam.io",
  description: "A closure record of Megam Systems and Rio/OS."
};

export default function HomePage() {
  const page = getPage("index");

  return (
    <article
      className="content-page home-page"
      dangerouslySetInnerHTML={{ __html: page.html }}
    />
  );
}
