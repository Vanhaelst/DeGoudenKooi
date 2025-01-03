import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CompanyData } from "@/data/companyData";
import { LINKS } from "@/enums/links";
import { LOCATIONS } from "@/enums/locations";
import { MegaMenuItem } from "@/components/organisms/navigation/mega-menu-item";
import { Button, Container } from "@/components/atoms";

export const MegaMenu = async ({
  locale = "nl",
  dict,
  gerechtstraat,
  haverwerf,
}) => {
  const recentPosts = [
    {
      id: 1,
      title: "Wat is het verschil nu juist tussen de belevingen?",
      href: `${LINKS[locale.toUpperCase()].NEWS}/wat-is-het-verschil-tussen-een-escape-game-en-een-escape-experience`,
      date: "Mar 16, 2023",
      datetime: "2023-03-16",
      category: { title: "Marketing", href: "#" },
      imageUrl: "/dgk-card.jpeg",
      description:
        "Bij De Gouden Kooi kun je kiezen uit escape games, escape experiences en ...",
    },
  ];

  return (
    <header
      className="relative w-full z-10 bg-cover drop-shadow-xl"
      style={{ backgroundImage: `url('${CompanyData.heroBg}')` }}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 z-20"
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
        <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-12 items-center">
          <Link
            href={LINKS[locale.toUpperCase()].ABOUT}
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all"
          >
            {dict.navigation.about}
          </Link>

          <div className="group isolate z-10 h-[80px] flex items-center">
            <div className="">
              <div className="mx-auto max-w-7xl">
                <div className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all">
                  {dict.navigation.games}
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 top-[80px] z-20 bg-white pt-16 shadow-lg ring-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 ring-gray-900/5 duration-200 ease-in-out">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-4 lg:px-8">
                <div className="grid col-span-3 grid-cols-3 gap-x-6 sm:gap-x-8">
                  <MegaMenuItem
                    locale={locale}
                    label={`${dict.general.gerechtstraat} (${dict.general.game})`}
                    queryparams={`?location=${LOCATIONS.GERECHTSTRAAT}`}
                    subItems={gerechtstraat}
                  />
                  <MegaMenuItem
                    locale={locale}
                    label={`${dict.general.haverwerf} (${dict.general.experience})`}
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
                <Container>
                  <div className="flex items-center gap-x-3 py-4">
                    <Image
                      width={48}
                      height={48}
                      src="/kalender.svg"
                      className="h-8 mr-2 lg:max-w-40 xl:max-w-40 w-auto"
                    />
                    <div>
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        {dict.navigation.calendar}
                      </h3>
                      <p className="text-sm leading-6 text-gray-600">
                        {dict.navigation.calendar_subtitle}
                      </p>
                    </div>
                  </div>
                </Container>
              </a>
            </div>
          </div>
          <a
            href={LINKS[locale.toUpperCase()].TEAMBUILDING}
            className="text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all"
          >
            {dict.navigation.teambuilding}
          </a>
          <a
            href={LINKS[locale.toUpperCase()].CONTACT}
            className="text-sm font-semibold leading-6 text-gray-900 hover:underline hover:pb-2 transition-all"
          >
            {dict.navigation.contact}
          </a>

          <a href={LINKS[locale.toUpperCase()].BOOK} className="cursor-pointer">
            <Button
              href={LINKS[locale.toUpperCase()].RESERVE}
              variant="secondary"
              callToAction={dict.navigation.reserve.toUpperCase()}
              type="rounded"
              size="small"
            />
          </a>
        </div>
      </nav>
    </header>
  );
};
