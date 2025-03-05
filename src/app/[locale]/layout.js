import { Inter } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoogleTagManager } from "@next/third-parties/google";

import "../globals.css";
import "../slick.css";
import React from "react";
import { TopBar } from "@/components/organisms/navigation/top-bar";
import { Footer } from "@/components/organisms/footer/footer";
import { redirect } from "next/navigation";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { Navigation } from "@/components/organisms/navigation/navigation";
import Image from "next/image";

const font = Inter({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        ...englishMetadata,
        openGraph: {
          ...defaultMetadata.openGraph,
          ...englishMetadata.description,
        },
      }
    : {
        ...defaultMetadata,
        ...dutchMetadata,
        openGraph: {
          ...defaultMetadata.openGraph,
          ...dutchMetadata.description,
        },
      };
}

export default function RootLayout({ children, params }) {
  if (params.locale !== "nl" && params.locale !== "en") {
    redirect("/nl");
  }

  return (
    <html lang={params.locale} className="bg-white">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      <body
        className={`${font.className} antialiased bg-[length:100%_100%] bg-center`}
        style={{ backgroundImage: `url('/achtergrond.png')` }}
      >
        <TopBar locale={params.locale} />
        <Navigation locale={params.locale} />

        <div className="border-wrapper fixed bottom-0 pointer-events-none w-full z-40">
          <Image
            className="absolute right-2 top-2"
            src="/border-top-right.png"
            alt="border-top-right.png"
            width={92}
            height={92}
          />
          <div
            className="border-top border-2 absolute left-2 top-2 border-primary-500"
            style={{ width: "calc(100% - 1rem - 92px)" }}
          />
          <div
            className="border-bottom border-2 absolute right-2 bottom-2 border-primary-500"
            style={{ width: "calc(100% - 1rem - 92px)" }}
          />
          <div
            className="border-left border-2 absolute left-2 top-2 border-primary-500"
            style={{ height: "calc(100% - 1rem - 92px)" }}
          />
          <div
            className="border-right border-2 absolute right-2 bottom-2 border-primary-500"
            style={{ height: "calc(100% - 1rem - 92px)" }}
          />
          <Image
            className="absolute bottom-2 left-2"
            src="/border-bottom-left.png"
            alt="border-bottom-left.png"
            width={92}
            height={92}
          />
        </div>

        {children}
        <Footer locale={params.locale} />
      </body>
    </html>
  );
}
