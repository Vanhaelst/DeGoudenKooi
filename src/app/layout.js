import { Inter } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./globals.css";
import "./slick.css";
import { Footer, MegaMenu, TopBar } from "@/components/organisms";
import React from "react";
import Head from "next/head";

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

export const metadata = {
  title: "Escape room Mechelen - De Gouden Kooi",
  description:
    "Plan een leuke uitstap met vrienden, familie of collega’s in onze escape room in Mechelen met zes verschillende escape rooms. Boek snel online!",
  keywords:
    "Bicobel, biscuiterie, confiserie, biscuiterie Lokeren, your sweetest partner, België, Belgium, Belgische chocolade, chocolade, biscuit, koek, koekje, koekjes, ambachtelijk, artisanaal",
  robots: process.env.NEXT_PUBLIC_META_ROBOTS,
  icons: "/favicons/cropped-pictogram-32x32.png",
  canonicalUrl: "https://degoudenkooi.be/",
  "theme-color": "#987222",
  openGraph: {
    type: "website",
    title: "Escape room Mechelen - De Gouden Kooi",
    description:
      "Plan een leuke uitstap met vrienden, familie of collega’s in onze escape room in Mechelen met zes verschillende escape rooms. Boek snel online!",
    url: "https://degoudenkooi.be/",
    site_name: "De Gouden Kooi",
    image: "/symbool-uitgesneden-en-transparant.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/favicons/cropped-pictogram-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/favicons/cropped-pictogram-180x180.png"
        />
        <meta
          name="msapplication-TileImage"
          content="favicons/cropped-pictogram-270x270.png"
        />
        <link
          rel="icon"
          href="/favicons/cropped-pictogram-32x32.png"
          sizes="32x32"
        />
        ;
      </Head>
      <body className={`${font.className} antialiased`}>
        <TopBar />
        <MegaMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
