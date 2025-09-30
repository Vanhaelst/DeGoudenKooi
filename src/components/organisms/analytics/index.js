"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import React from "react";

export const GoogleAnalytics = () => {
  const cookieBot = window?.localStorage.getItem("ucData");
  const analyticsStorage = JSON.parse(cookieBot)?.gcm?.analyticsStorage;

  if (analyticsStorage === "granted") {
    console.log("granted");
    return <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />;
  }
  console.log("null");

  return null;
};
