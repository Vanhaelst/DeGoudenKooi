import Link from "next/link";
import { TopBar } from "@/components/organisms/navigation/top-bar";
import { MegaMenu } from "@/components/organisms/navigation/mega-menu";
import React from "react";
import { Footer } from "@/components/organisms/footer/footer";

export default function NotFound({ params }) {
  const locale = "nl";

  return (
    <>
      <TopBar locale={locale} />
      <MegaMenu locale={locale} />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/nl">Return Home</Link>
      <Footer locale={locale} />
    </>
  );
}
