import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { MegaMenuItem } from "@/components/organisms/navigation/mega-menu-item";
import { CompanyData } from "@/data/companyData";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import Link from "next/link";
import { LINKS } from "@/enums/links";
import { LOCATIONS } from "@/enums/locations";
import { GAMETYPE } from "@/enums/gameTypes";

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

export const MegaMenu = async () => {
  const { rooms } = await getGames();

  const gerechtstraat = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.GERECHTSTRAAT,
  );
  const haverwerf = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.HAVERWERF,
  );

  return (
    <header className="bg-primary-500/25 shadow">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href={LINKS.HOME} className="-m-1.5 p-1.5">
            <span className="sr-only">{CompanyData.name}</span>
            <Image
              width={121}
              height={18}
              src={CompanyData.logo}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 items-center">
          <Link
            href={LINKS.ABOUT}
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
          >
            Ons verhaal
          </Link>
          <Popover className="isolate z-50">
            <div className="py-5">
              <div className="mx-auto max-w-7xl">
                <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Games & Experiences
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel
              transition
              className="absolute inset-x-0 top-[150px] -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-4 lg:px-8">
                <div className="grid col-span-3 grid-cols-3 gap-x-6 sm:gap-x-8">
                  <MegaMenuItem
                    label="Gerechtstraat"
                    queryparams={`?location=${LOCATIONS.GERECHTSTRAAT}`}
                    subItems={gerechtstraat}
                  />
                  <MegaMenuItem
                    label="Haverwerf"
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

              <div className="bg-gray-50 hover:bg-[#cba442]/25 cursor-pointer">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-4">
                  <a href={LINKS.BOOK} className="flex items-center gap-x-3">
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                      Bekijk onze agenda
                    </h3>
                    <p className="rounded-full bg-indigo-600/10 px-2.5 pt-1.5 text-xs font-semibold text-indigo-600 hidden">
                      New
                    </p>
                  </a>
                  <p className="text-sm leading-6 text-gray-600">
                    Claim jouw avontuur nu
                  </p>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
          <a
            href={LINKS.TEAMBUILDING}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Teambuilding & Events
          </a>
          <a
            href={LINKS.CONTACT}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact
          </a>

          <a href={LINKS.BOOK} className="cursor-pointer">
            <button
              type="button"
              className="cursor-pointer rounded-full bg-[#cba442] hover:bg-[#a5832d] px-3.5 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Reserveer nu
            </button>
          </a>
        </PopoverGroup>
      </nav>
    </header>
  );
};
