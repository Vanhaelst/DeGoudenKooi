"use client";

import { Container } from "@/components/atoms";
import Script from "next/script";
import Image from "next/image";
import { Title } from "@/components/molecules";
import { BOOKEO, bookeo_url } from "@/enums/bookeo";

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const version = generateRandomInteger(0, 50);

export const Bookeo = ({ variant, locale, title }) => {
  const lang = locale === "en" ? "&languageCode=en_US" : "";

  return (
    <>
      <div id="book" />
      <Image
        src="/scheur-top.png"
        alt="scheur"
        width={1459}
        height={60}
        className="w-full"
      />
      <section className="bg-white relative py-12 lg:py-24 ">
        {title && (
          <Container classnames="">
            <Title title={title} />
          </Container>
        )}
        <Container classnames="min-h-80 flex flex-col justify-center items-center">
          <div id="bookeo_position" style={{ clear: "both", width: "100%" }} />

          <Script
            // strategy="beforeInteractive"
            strategy="afterInteractive"
            // strategy="lazyOnload"
            type="text/javascript"
            data-type="bookeo_script"
            data-variant={variant}
            onReady={() => bookeo_start?.()}
            id={`bookeo_script-${variant}`}
            src={`${bookeo_url}${variant ? BOOKEO[variant] : ""}${lang}`}
          />
        </Container>
      </section>
      <Image
        src="/scheur-bottom.png"
        alt="scheur"
        width={1459}
        height={60}
        className="w-full"
      />
    </>
  );
};
