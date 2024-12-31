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

export default function RootLayout({ children, params }) {
  console.log("layout", params);
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <TopBar locale={"nl"} />
        <MegaMenu locale={params.locale} />
        {children}
        <Footer locale={"nl"} />
      </body>
    </html>
  );
}
