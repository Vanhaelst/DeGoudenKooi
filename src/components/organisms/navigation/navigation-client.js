"use client";

import React, { useState } from "react";
import { MegaMenu } from "@/components/organisms/navigation/mega-menu";
import { LOCATIONS } from "@/enums/locations";
import { MobileNavigation } from "@/components/organisms/navigation/mobile-navigation";
import { LINKS } from "@/enums/links";
import { usePathname } from "next/navigation";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";

export const NavigationClient = ({ locale = "nl", dict, rooms }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const gerechtstraat = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.GERECHTSTRAAT,
  );
  const haverwerf = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.HAVERWERF,
  );

  return (
    <>
      <MegaMenu
        locale={locale}
        dict={dict}
        gerechtstraat={gerechtstraat}
        haverwerf={haverwerf}
        setOpen={setOpen}
      />

      <MobileNavigation
        topbar={[
          {
            name: dict.navigation.about,
            href: LINKS[locale.toUpperCase()].ABOUT,
          },
          {
            name: dict.topbar.awards,
            href: LINKS[locale.toUpperCase()].AWARDS,
          },
          locale === "nl"
            ? {
                name: dict.topbar.news,
                href: LINKS[locale.toUpperCase()].NEWS,
              }
            : null,
        ]}
        nav={[
          {
            name: dict.navigation.games,
            href: LINKS[locale.toUpperCase()].GAME_OVERVIEW,
          },
          {
            name: dict.navigation.teambuilding,
            href: LINKS[locale.toUpperCase()].TEAMBUILDING,
          },
          {
            name: dict.topbar.giftcard,
            href: LINKS[locale.toUpperCase()].GIFTCARD,
          },
          {
            name: dict.topbar.faq,
            href: LINKS[locale.toUpperCase()].FAQ,
          },
          {
            name: dict.navigation.contact,
            href: LINKS[locale.toUpperCase()].CONTACT,
          },
        ]}
        open={open}
        locale={locale}
        setOpen={setOpen}
      />

      <div
        className={clsx(
          "fixed bottom-0 z-50 w-full sm:hidden",
          pathname === LINKS.NL.BOOK ? "hidden" : "",
          pathname === LINKS.EN.BOOK ? "hidden" : "",
          pathname.includes("/escape-rooms/") ? "hidden" : "",
        )}
      >
        <a
          href={locale === "en" ? LINKS.EN.BOOK : LINKS.NL.BOOK}
          className=""
          target="_self"
        >
          <button
            className={clsx(
              "border border-primary-500 bg-primary-500",
              "text-white font-semibold",
              "px-12 py-4 text-md md:text-base",
              "w-full animate-scale",
              "flex justify-center items-center",
            )}
          >
            {dict.navigation.mobile_book}
            <ArrowRightIcon
              aria-hidden="true"
              className="pointer-events-none size-5 text-white ml-2 sm:size-4"
            />
          </button>
        </a>
      </div>
    </>
  );
};
