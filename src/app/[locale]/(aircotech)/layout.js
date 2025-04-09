import { Open_Sans } from "next/font/google";

import React from "react";
import "./globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import { redirect } from "next/navigation";
import Script from "next/script";
import { Cookiebot } from "@/components/organisms/Cookiebot";

const font = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export default function RootLayout({ children, params }) {
  if (params.locale !== "nl" && params.locale !== "en") {
    redirect("/nl");
  }

  return (
    <html lang={params.locale} className="bg-white">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_AIRCOTECH} />
      <body
        className={`${font.className} antialiased bg-[length:100%_100%] bg-center`}
      >
        {children}

        <Cookiebot />
      </body>
    </html>
  );
}
