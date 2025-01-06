import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { Hero } from "@/components/molecules/hero/hero";
import React from "react";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import { FixedPageQuery } from "@/queries/sections/fixedPage";
import { SeoQuery } from "@/queries/sections/seo";

export const fetchCache = "force-no-store";

async function getPage({ language }) {
  return fetchData(FixedPageQuery({ page: "reserveEntries", language }));
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "reserveEntries", language: params.locale }),
  );

  const { seoTitle, seoDescription, seoKeywords, seoUrl, seoImage } = page?.[0];

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
      url: seoUrl || defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });

  const {
    title,
    description,
    image,
    buttons,
    type,
    backgroundColor,
    backgroundImage,
    sections,
  } = page[0] ?? {};
  return (
    <>
      <Hero
        type={type}
        title={title}
        description={description}
        buttons={buttons}
        image={image}
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
      />

      <Bookeo locale={params.locale} />
      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
