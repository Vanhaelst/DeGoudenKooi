"use client";

import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { LINKS } from "@/enums/links";

export const Borders = () => {
  const pathname = usePathname();

  let bookingsPage =
    pathname === LINKS.NL.BOOK ||
    pathname === LINKS.EN.BOOK ||
    pathname.includes("/escape-rooms/");

  return (
    <div
      style={{ "-webkit-transform": "translateZ(0);" }}
      className={clsx(
        bookingsPage ? "h-[calc(100%_-_76px)]" : "h-[calc(100%_-_136px)]",
        "sm:h-[calc(100%_-_72px)] md:h-[calc(100%_-_85px)] lg:h-[calc(100%_-_90px)]",
        "border-wrapper fixed sm:bottom-0 top-[76px] lg:top-[90px] pointer-events-none w-full z-40",
      )}
    >
      <Image
        className="absolute right-2 top-2 w-14 md:w-24"
        src="/border-top-right.png"
        alt="border-top-right.png"
        width={92}
        height={92}
      />
      <div className="border md:border-2 absolute border-primary-500 w-[calc(100%_-_1rem_-_65px)] md:w-[calc(100%_-_1rem_-_92px)] border-top left-1 top-1 md:left-2 md:top-2" />
      <div className="border md:border-2 absolute border-primary-500 w-[calc(100%_-_1rem_-_65px)] md:w-[calc(100%_-_1rem_-_92px)] border-bottom right-1 bottom-1 md:right-2 md:bottom-2" />
      <div className="border md:border-2 absolute border-primary-500 h-[calc(100%_-_1rem_-_65px)] md:h-[calc(100%_-_1rem_-_92px)] border-left left-1 top-1 md:left-2 md:top-2" />
      <div className="border md:border-2 absolute border-primary-500 h-[calc(100%_-_1rem_-_65px)] md:h-[calc(100%_-_1rem_-_92px)] border-right right-1 bottom-1 md:right-2 md:bottom-2" />
      <Image
        className="absolute bottom-2 left-2 w-14 md:w-24"
        src="/border-bottom-left.png"
        alt="border-bottom-left.png"
        width={92}
        height={92}
      />
    </div>
  );
};
