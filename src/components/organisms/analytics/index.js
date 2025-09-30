"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import React from "react";

export const GoogleAnalytics = () => {
  if (typeof window !== "undefined") {
    const cookieBot = window?.localStorage.getItem("ucData");
    const analyticsStorage = JSON.parse(cookieBot)?.gcm?.analyticsStorage;

    return (
      <GoogleTagManager
        gtmId={
          analyticsStorage === "granted" ? process.env.NEXT_PUBLIC_GTM : ""
        }
      />
    );
  }

  return null;
};
