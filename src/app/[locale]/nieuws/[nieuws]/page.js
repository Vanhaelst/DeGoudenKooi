import React from "react";
import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
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
import { SeoQuery } from "@/queries/sections/seo";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";

const query = ({ pathname, language = "nl" }) => {
  return `
        query MyQuery {
              blog: blogsEntries(slug: "${pathname}", language: "${language}") {
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

async function getPage({ pathname, language }) {
  return fetchData(query({ pathname, language }));
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(`
        query MyQuery {
        page: blogsEntries(slug: "${params.nieuws}", language: "${params.locale}") {
        ... on newsItem_Entry {
                id
                title
                image ${imageQuery}
                ${seoEntry}
            }
        }
    }`);

  const { title, seoTitle, seoDescription, seoKeywords, seoImage, image } =
    page?.[0];

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    title: seoTitle || title || defaultMetadata.title,
    description: seoDescription || metaData.description,
    keywords: seoKeywords || metaData.keywords,
    images:
      seoImage?.[0]?.url || image?.[0]?.url || defaultMetadata.openGraph.image,

    openGraph: {
      ...defaultMetadata.openGraph,
      title: seoTitle || defaultMetadata.title,
      description: seoDescription || metaData.description,
      url: defaultMetadata.openGraph.url,
      images:
        seoImage?.[0]?.url ||
        image?.[0]?.url ||
        defaultMetadata.openGraph.image,
    },
  };
}

export default async function News({ params }) {
  const { blog } = await getPage({
    pathname: params.nieuws,
    language: params.locale,
  });

  const { image, title, shortDescription, blogsections } = blog?.[0] || {};

  const t = params.locale === "en" ? en : nl;
  const pages = [
    {
      name: t.topbar.news,
      href: LINKS[params.locale.toUpperCase()]?.NEWS,
      current: false,
    },
    { name: title, href: "#", current: true },
  ];

  if (!blog) {
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
