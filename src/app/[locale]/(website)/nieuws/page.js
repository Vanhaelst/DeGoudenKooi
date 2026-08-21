import React from "react";
import { revalidateTag } from "next/cache";

import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { Container } from "@/components/atoms";
import { imageQuery } from "@/queries/entries/image";
import { renderComponents } from "@/utils/renderComponents";
import { PageQuery } from "@/queries/sections/page";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { SeoQuery } from "@/queries/sections/seo";
import { NewsPaginated } from "./client";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";
import {
  absoluteUrl,
  breadcrumbSchema,
  createJsonLd,
  itemListSchema,
  JsonLdScript,
  webpageSchema,
} from "@/utils/jsonLd";

async function getPage({ language, token }) {
  return fetchData(
    PageQuery({ page: "nieuwsEntries" }),
    {
      revalidate: REVALIDATE,
      tags: [`page-nieuwsEntries`, `language-${language}`],
    },
    token,
  );
}

const amount = 5;
async function getBlogs({ language, token }) {
  revalidateTag("news_paginated");
  return fetchData(
    `query MyQuery {
      blogs: newsEntries(language: "${language}", orderBy: "postDate desc", limit: ${amount}) {
        ... on article_Entry {
          id
          title
          slug: uri
          description
          postDate
          image ${imageQuery}
          links {
            ... on link_Entry {
              title
              href
            }
          }
        }
      }
            count: entryCount(section: "news")

    }`,
    {
      tags: ["news"],
    },
    token,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "blogEntries", language: params.locale }),
    {
      revalidate: REVALIDATE,
      tags: [`page-blogEntries`, `language-${params.locale}`],
    },
  );

  const { seoTitle, seoDescription, seoKeywords, seoImage } = page?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    title: seoTitle || defaultMetadata.title,
    description: seoDescription || metaData.description,
    keywords: seoKeywords || metaData.keywords,
    images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,

    openGraph: {
      ...defaultMetadata.openGraph,
      title: seoTitle || defaultMetadata.title,
      description: seoDescription || metaData.description,
      url: defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });
  const { blogs, count } = await getBlogs({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });

  const currentPage = page[0];
  const sections = currentPage?.sections;
  const transparentImage = currentPage?.transparentImage?.[0];
  const webPage = webpageSchema({
    locale: params.locale,
    path: params.locale === "en" ? "news" : "nieuws",
    page: currentPage,
    type: "CollectionPage",
  });
  const jsonLd = createJsonLd([
    webPage,
    breadcrumbSchema({
      locale: params.locale,
      items: [{ name: "Nieuws", url: webPage.url }],
    }),
    itemListSchema({
      id: `${webPage.url}#news`,
      items: blogs.map((item) => ({
        name: item.title,
        url: absoluteUrl(`/${item.slug}`),
      })),
    }),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      {sections?.map((section) => renderComponents(section, params.locale))}
      <ImageWrapper image={transparentImage}>
        <Container classnames="mb-28">
          <NewsPaginated
            news={blogs}
            locale={params.locale}
            amount={amount}
            count={count}
          />
        </Container>
      </ImageWrapper>
    </>
  );
}
