import React from "react";
import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { imageQuery } from "@/queries/entries/image";
import { Hero } from "@/components/molecules/hero/hero";
import { contentEntry } from "@/queries/entries/content";
import { featuresEntry } from "@/queries/entries/features";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { lightboxEntry } from "@/queries/entries/lightbox";
import { videoEntry } from "@/queries/entries/video";
import { Loader } from "@/components/atoms/loader/loader";
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

const query = ({ pathname, language = "nl", token }) => {
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
  return fetchData(
    query({ pathname, language }),
    {
      revalidate: REVALIDATE,
      tags: [`page-${pathname}`, `language-${language}`],
    },
    token,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `
        query MyQuery {
        page: blogsEntries(slug: "${params.nieuws}", language: "${params.locale}") {
        ... on newsItem_Entry {
                id
                title
                image ${imageQuery}
                ${seoEntry}
            }
        }
    }`,
    {
      revalidate: REVALIDATE,
      tags: [`metadata-${params.nieuws}`, `language-${params.locale}`],
    },
  );

  const { title, seoTitle, seoDescription, seoKeywords, seoImage, image } =
    page?.[0] ?? {};

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

export default async function News({ params, searchParams }) {
  const { blog } = await getPage({
    pathname: params.nieuws,
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
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

      {blogsections?.map((section) => renderComponents(section, params.locale))}
      <div className="pb-20" />
    </>
  );
}
