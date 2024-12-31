import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { MegaMenuItem } from "@/components/organisms/navigation/mega-menu-item";
import { CompanyData } from "@/data/companyData";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import Link from "next/link";
import { LINKS } from "@/enums/links";
import { LOCATIONS } from "@/enums/locations";
import { GAMETYPE } from "@/enums/gameTypes";
import { Button } from "@/components/atoms";

const recentPosts = [
  {
    id: 1,
    title:
      "Wat is het verschil tussen een Escape Room en een Escape Experience?",
    href: "#",
    date: "Mar 16, 2023",
    datetime: "2023-03-16",
    category: { title: "Marketing", href: "#" },
    imageUrl: "/degoudenkooi.jpeg",
    description:
      "Bij een Escape Experience gaan we bij De Gouden Kooi net een stapje verder dan...",
  },
];

async function getGames() {
  return fetchData(
    roomsQuery({
      type: `"${GAMETYPE.GAME}", "${GAMETYPE.EXPERIENCE}", "${GAMETYPE.WALK}"`,
      location: `"${LOCATIONS.GERECHTSTRAAT}", "${LOCATIONS.HAVERWERF}"`,
    }),
  );
}

export const MegaMenu = async ({ locale = "nl" }) => {
  const { rooms } = await getGames();

  const gerechtstraat = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.GERECHTSTRAAT,
  );
  const haverwerf = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.HAVERWERF,
  );

  return (
    <header className="relative z-10 bg-primary-500/25 drop-shadow-xl py-5">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="flex -m-1.5 p-1.5">
            <span className="sr-only">{CompanyData.name}</span>
            <Image
              width={48}
              height={48}
              src="/symbool.png"
              className="h-8 mr-2 lg:max-w-40 xl:max-w-40 w-auto"
            />
            <Image
              width={121}
              height={18}
              src={CompanyData.logo}
              className="h-8 lg:max-w-40 xl:max-w-40 w-auto"
            />
          </Link>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-6 xl:gap-x-12 items-center">
          <Link
            href={LINKS[locale.toUpperCase()].ABOUT}
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all"
          >
            Ons verhaal
          </Link>
          <Popover className="isolate z-10">
            <div className="">
              <div className="mx-auto max-w-7xl">
                <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all">
                  Games & Experiences
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel
              transition
              className="absolute inset-x-0 top-[80px] -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-4 lg:px-8">
                <div className="grid col-span-3 grid-cols-3 gap-x-6 sm:gap-x-8">
                  <MegaMenuItem
                    locale={locale}
                    label="Gerechtstraat (game)"
                    queryparams={`?location=${LOCATIONS.GERECHTSTRAAT}`}
                    subItems={gerechtstraat}
                  />
                  <MegaMenuItem
                    locale={locale}
                    label="Haverwerf (experience)"
                    queryparams={`?location=${LOCATIONS.HAVERWERF}`}
                    subItems={haverwerf}
                  />
                </div>
                <div className="grid grid-cols-1 gap-10 sm:gap-8 ">
                  <h3 className="sr-only">Escape Games</h3>
                  {recentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                    >
                      <div className="relative flex-none">
                        <img
                          alt=""
                          src={post.imageUrl}
                          className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
                        />
                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div>
                        <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                          <a href={post.href}>
                            <span className="absolute inset-0" />
                            {post.title}
                          </a>
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {post.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <a
                href={LINKS[locale.toUpperCase()].BOOK}
                className="flex bg-gray-100 hover:bg-primary-500/25 cursor-pointer"
              >
                <div className="flex items-center gap-x-3 sm:px-6 lg:px-8 py-4">
                  <Image
                    width={48}
                    height={48}
                    src="/kalender.svg"
                    className="h-8 mr-2 lg:max-w-40 xl:max-w-40 w-auto"
                  />
                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      Bekijk onze agenda
                    </h3>
                    <p className="text-sm leading-6 text-gray-600">
                      Claim jouw avontuur nu
                    </p>
                  </div>
                </div>
              </a>
            </PopoverPanel>
          </Popover>
          <a
            href={LINKS[locale.toUpperCase()].TEAMBUILDING}
            className="text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all"
          >
            Teambuilding & Events
          </a>
          <a
            href={LINKS[locale.toUpperCase()].CONTACT}
            className="text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all"
          >
            Contact
          </a>

          <a href={LINKS[locale.toUpperCase()].BOOK} className="cursor-pointer">
            <Button
              href="#"
              variant="secondary"
              callToAction="RESERVEER NU"
              type="rounded"
              size="small"
            />
          </a>
        </PopoverGroup>
      </nav>
    </header>
  );
};
