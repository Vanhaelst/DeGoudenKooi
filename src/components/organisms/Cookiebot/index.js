import Script from "next/script";
import React from "react";

/* eslint-disable @next/next/no-before-interactive-script-outside-document */
export const Cookiebot = () => {
  return (
    <>
      {process.env.NEXT_PUBLIC_COOKIE_TYPE === "auto" ? (
        <Script
          src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
          strategy="beforeInteractive"
        />
      ) : null}
      <Script
        id="usercentrics-cmp"
        src="https://web.cmp.usercentrics.eu/ui/loader.js"
        data-settings-id="Q_xuNFhDQfahYX"
        strategy="beforeInteractive"
        data-draft={process.env.NODE_ENV !== "production"}
      />
    </>
  );
};
