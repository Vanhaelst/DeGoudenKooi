import { Inter } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoogleTagManager } from "@next/third-parties/google";

import "./globals.css";
import "./slick.css";
import React from "react";
import { TopBar } from "@/components/organisms/navigation/top-bar";
import { MegaMenu } from "@/components/organisms/navigation/mega-menu";
import { Footer } from "@/components/organisms/footer/footer";
import { redirect } from "next/navigation";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";

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
    <html lang={params.locale}>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      <body className={`${font.className} antialiased`}>
        <TopBar locale={params.locale} />
        <MegaMenu locale={params.locale} />
        {children}
        <Footer locale={params.locale} />
      </body>
    </html>
  );
}
