import { Roboto_Condensed } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./globals.css";
import "../../slick.css";
import React from "react";
import Image from "next/image";

export const Borders = () => {
  return (
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
  );
};
