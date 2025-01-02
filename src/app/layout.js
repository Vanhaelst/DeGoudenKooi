import { Inter } from "next/font/google";

import "./[locale]/globals.css";

import React from "react";

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
  keywords: "",
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
    image: "/symbool.png",
  },
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.locale} className="h-full">
      <body className={`${font.className} antialiased h-full`}>{children}</body>
    </html>
  );
}
