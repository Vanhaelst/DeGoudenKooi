"use client";

import Image from "next/image";
import { CompanyData } from "@/data/companyData";
import { LINKS } from "@/enums/links";
import { Button } from "@/components/atoms";
import { Bars2Icon } from "@heroicons/react/24/solid";

export const MegaMenu = ({ locale = "nl", dict, setOpen }) => {
  return (
    <header
      className="fixed top-0 lg:top-9 w-full z-10 bg-cover drop-shadow-xl py-2 md:py-5 lg:py-0"
      style={{ backgroundImage: `url('${CompanyData.heroBg}')` }}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 z-20"
      >
        <div className="flex justify-between w-full lg:w-auto">
          <a href={`/${locale}`} className="flex -m-1.5 p-1.5">
            <span className="sr-only">{CompanyData.name}</span>
            <Image
              alt={CompanyData.name}
              width={121}
              height={18}
              src={CompanyData.logo}
              className="h-8 md:h-10 w-auto"
            />
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden -ml-2 bg-primary-500 p-2 text-white rounded-xl"
          >
            <span className="sr-only">Open menu</span>
            <Bars2Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-12 items-center">
          {/*<div className="group isolate z-10 h-[80px] flex items-center">
            <div className="">
              <div className="mx-auto max-w-7xl">
                <div className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-secondary-700 hover:underline hover:pb-2 transition-all">
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
                        <h4 className="mt-2 text-sm font-semibold leading-6 text-secondary-700">
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
                      <h3 className="text-sm font-semibold leading-6 text-secondary-700">
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
          </div>*/}
          <a
            href={LINKS[locale.toUpperCase()].GAME_OVERVIEW}
            className="text-sm font-semibold leading-6 text-secondary-700 hover:underline hover:pb-2 transition-all uppercase"
          >
            {dict.navigation.games}
          </a>
          <a
            href={LINKS[locale.toUpperCase()].TEAMBUILDING}
            className="text-sm font-semibold leading-6 text-secondary-700 hover:underline hover:pb-2 transition-all uppercase"
          >
            {dict.navigation.teambuilding}
          </a>
          <a
            href={LINKS[locale.toUpperCase()].GIFTCARD}
            className="text-sm font-semibold leading-6 text-secondary-700 hover:underline hover:pb-2 transition-all uppercase"
          >
            {dict.topbar.giftcard}
          </a>
          <a
            href={LINKS[locale.toUpperCase()].FAQ}
            className="text-sm font-semibold leading-6 text-secondary-700 hover:underline hover:pb-2 transition-all uppercase"
          >
            {dict.topbar.faq}
          </a>
          <a
            href={LINKS[locale.toUpperCase()].CONTACT}
            className="text-sm font-semibold leading-6 text-secondary-700 hover:underline hover:pb-2 transition-all uppercase"
          >
            {dict.navigation.contact}
          </a>

          <Button
            classnames="animate-scale"
            href={LINKS[locale.toUpperCase()].RESERVE}
            variant="secondary"
            callToAction={dict.navigation.reserve.toUpperCase()}
            type="rounded"
            size="small"
          />
        </div>
      </nav>
    </header>
  );
};
