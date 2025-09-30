import { Roboto_Condensed } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoogleTagManager } from "@next/third-parties/google";

import "./globals.css";
import "../../slick.css";
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
import { Borders } from "@/app/[locale]/(website)/border";
import { Cookiebot } from "@/components/organisms/Cookiebot";
import Popup from "@/components/molecules/popup";
import { GoogleAnalytics } from "@/components/organisms/analytics";

const font = Roboto_Condensed({
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
    <html
      lang={params.locale === "en" ? "en-US" : "nl-NL"}
      className="bg-white"
    >
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      <meta
        name="google-site-verification"
        content="QPVFwJyzUdQNKFlSBAdgdjxBnK8OfPhkScwB_O6pyEA"
      />
      <body className={`${font.className} antialiased`}>
        <TopBar locale={params.locale} />
        <Navigation locale={params.locale} />

        <Borders />
        <main
          className="bg-[length:100%_100%] bg-center"
          style={{ backgroundImage: "url('/achtergrond2.png')" }}
        >
          {children}
        </main>
        <Footer locale={params.locale} />
        <Popup locale={params.locale} />
        <Cookiebot />
      </body>
    </html>
  );
}
