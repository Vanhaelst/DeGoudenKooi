"use client";

import { useState } from "react";
import { MegaMenu } from "@/components/organisms/navigation/mega-menu";
import { LOCATIONS } from "@/enums/locations";
import { MobileNavigation } from "@/components/organisms/navigation/mobile-navigation";
import { LINKS } from "@/enums/links";

export const NavigationClient = ({ locale = "nl", dict, rooms }) => {
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
    </>
  );
};
