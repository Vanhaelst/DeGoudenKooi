"use client";

import React from "react";
import { LINKS } from "@/enums/links";
import nl from "@/app/[locale]/dictionaries/nl.json";
import en from "@/app/[locale]/dictionaries/en.json";
import { usePathname, useParams } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const t = pathname.includes("/nl/") ? nl : en;

  return (
    <main className="relative isolate min-h-full">
      <img
        alt=""
        src="/dgk-card.jpeg"
        className="absolute inset-0 -z-10 size-full object-cover object-top"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
      <div className="relative z-30 mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          {t.notFound.title}
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
          {t.notFound.subtitle}
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={LINKS.NL.HOME}
            className="text-sm/7 font-semibold text-white"
          >
            <span aria-hidden="true">&larr;</span> {t.notFound.button}
          </a>
        </div>
      </div>
    </main>
  );
}
