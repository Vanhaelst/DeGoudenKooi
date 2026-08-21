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
import {
  absoluteUrl,
  breadcrumbSchema,
  createJsonLd,
  getLanguage,
  getPageUrl,
  getSeoValues,
  JsonLdScript,
  SITE_URL,
  webpageSchema,
} from "@/utils/jsonLd";

const query = ({ pathname, language = "nl", token }) => {
  return `
        query MyQuery {
              blog: blogsEntries(slug: "${pathname}", language: "${language}") {
                  ... on newsItem_Entry {
                      id
                      title
                      shortDescription
                      postDate
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

  const currentNews = blog?.[0];
  const { image, title, shortDescription, postDate, blogsections } =
    currentNews || {};

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
  const newsPath = params.locale === "en" ? "news" : "nieuws";
  const path = `${newsPath}/${params.nieuws}`;
  const webPage = webpageSchema({
    locale: params.locale,
    path,
    page: currentNews,
  });
  const seo = getSeoValues({ locale: params.locale, page: currentNews });
  const jsonLd = createJsonLd([
    {
      ...webPage,
      mainEntity: {
        "@id": `${webPage.url}#article`,
      },
    },
    {
      "@type": "NewsArticle",
      "@id": `${webPage.url}#article`,
      url: webPage.url,
      headline: title,
      description: webPage.description,
      datePublished: postDate,
      articleSection: t.topbar.news,
      mainEntityOfPage: {
        "@id": `${webPage.url}#webpage`,
      },
      image: image?.[0]?.url ? absoluteUrl(image[0].url) : seo.image,
      author: {
        "@id": `${SITE_URL}/#organization`,
      },
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: getLanguage(params.locale),
    },
    breadcrumbSchema({
      locale: params.locale,
      items: [
        { name: t.topbar.news, url: getPageUrl(params.locale, newsPath) },
        { name: title, url: webPage.url },
      ],
    }),
  ]);
  return (
    <>
      <JsonLdScript data={jsonLd} />
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
