import { Roboto_Condensed } from "next/font/google";

import React from "react";
import "./globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import { redirect } from "next/navigation";
import { Container, Text } from "@/components/atoms";
import Image from "next/image";
import Link from "next/link";
import { CompanyData } from "@/data/companyData";
import Script from "next/script";
import { Cookiebot } from "@/components/organisms/Cookiebot";

const font = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export default function RootLayout({ children, params }) {
  if (params.locale !== "nl" && params.locale !== "en") {
    redirect("/nl");
  }

  return (
    <html lang={params.locale} className="bg-white">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_DE_NEKKER} />
      <body
        className={`${font.className} antialiased bg-[length:100%_100%] bg-center`}
      >
        <section className="bg-[#243881]">
          <Container>
            <Image
              src="/tippagina/politiebanner.webp"
              height={625}
              width={1667}
              alt="politiebanner"
              className="max-w-full w-full"
            />
          </Container>
        </section>
        {children}
        <section className="bg-[#243881] py-8 md:py-14 bg-contain bg-right-bottom">
          <Container>
            <Text
              as="p"
              level="lg"
              classnames="font-light text-white text-center pb-8"
            >
              Schade aan de puzzels? Iets mis? Bel ons op{" "}
              <Link href="tel:015676886" className="underline">
                015/67.68.86
              </Link>
              .
            </Text>
            <Text
              as="p"
              level="lg"
              classnames="font-light text-white text-center"
            >
              Ben je hier per ongeluk terechtgekomen? Bezoek dan{" "}
              <Link href="/" className="underline">
                onze website
              </Link>
              .
            </Text>
            <Image
              width={121}
              height={18}
              src={CompanyData.logo}
              alt={CompanyData.name}
              className="h-10 w-auto mx-auto mt-8"
            />
          </Container>
        </section>

        <Cookiebot />
      </body>
    </html>
  );
}
