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
        nav={[
          {
            name: dict.general.gerechtstraat,
            href: LINKS[locale.toUpperCase()].ABOUT,
            children: gerechtstraat,
          },
          {
            name: dict.general.haverwerf,
            href: LINKS[locale.toUpperCase()].ABOUT,
            children: haverwerf,
          },
          {
            name: dict.navigation.contact,
            href: LINKS[locale.toUpperCase()].ABOUT,
          },
          {
            name: dict.topbar.news,
            href: LINKS[locale.toUpperCase()].ABOUT,
          },
          {
            name: dict.topbar.giftcard,
            href: LINKS[locale.toUpperCase()].ABOUT,
          },
          {
            name: dict.topbar.faq,
            href: LINKS[locale.toUpperCase()].ABOUT,
          },
          {
            name: dict.topbar.awards,
            href: LINKS[locale.toUpperCase()].ABOUT,
          },
        ]}
        open={open}
        locale={locale}
        setOpen={setOpen}
      />
    </>
  );
};
