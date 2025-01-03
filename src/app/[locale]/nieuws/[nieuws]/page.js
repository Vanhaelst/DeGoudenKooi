"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { usePathname } from "next/navigation";
import { imageQuery } from "@/queries/entries/image";
import { Hero } from "@/components/molecules/hero/hero";
import { contentEntry } from "@/queries/entries/content";
import { featuresEntry } from "@/queries/entries/features";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { lightboxEntry } from "@/queries/entries/lightbox";
import { videoEntry } from "@/queries/entries/video";
import { Loader } from "@/components/atoms/loader/loader";
import { HomeIcon } from "@heroicons/react/20/solid";
import { LINKS } from "@/enums/links";

import nl from "@/app/[locale]/dictionaries/nl.json";
import en from "@/app/[locale]/dictionaries/en.json";

const query = ({ pathname, language = "nl" }) => {
  return `
        query MyQuery {
              blog: blogsEntries(uri: "${pathname?.slice(4)}", language: "${language}") {
                  ... on newsItem_Entry {
                      id
                      title
                      shortDescription
                      uri
                      slug
                      image ${imageQuery}
                      
                      blogsections {
                       ${featuresEntry}
                       ${callToActionEntry}
                       ${contentEntry}
                       ${videoEntry}
                       ${lightboxEntry}
                      }
                  }
              }
        }
  `;
};

export default function News({ params }) {
  const [data, setData] = useState(undefined);
  const pathname = usePathname();

  useEffect(() => {
    fetchData(query({ pathname, language: params.locale })).then((res) => {
      setData(res?.blog[0]);
    });
  }, [pathname, params]);

  const { image, title, shortDescription, blogsections } = data || {};

  const t = params.locale === "en" ? en : nl;
  const pages = [
    {
      name: t.topbar.news,
      href: LINKS[params.locale.toUpperCase()]?.NEWS,
      current: false,
    },
    { name: title, href: "#", current: true },
  ];

  if (!data) {
    return <Loader />;
  }
  return (
    <>
      <Hero
        title={title}
        description={shortDescription}
        type="horizontal"
        backgroundColor="lightGray"
        image={image}
        awards={false}
      />

      <nav
        aria-label="Breadcrumb"
        className="flex border-b border-gray-200 bg-white"
      >
        <ol
          role="list"
          className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
        >
          <li className="flex">
            <div className="flex items-center">
              <a
                href={LINKS[params.locale.toUpperCase()]?.HOME}
                className="text-gray-400 hover:text-gray-500"
              >
                <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={page.href}
                  aria-current={page.current ? "page" : undefined}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {blogsections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
