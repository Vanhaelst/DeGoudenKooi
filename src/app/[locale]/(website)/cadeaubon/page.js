import { Hero } from "@/components/molecules/hero/hero";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import React from "react";
import { renderComponents } from "@/utils/renderComponents";
import { fetchData } from "@/utils/fetchData";
import { FixedPageQuery } from "@/queries/sections/fixedPage";
import { seoEntry } from "@/queries/entries/seo";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `query MyQuery {
      page: cadeaubonEntries(language: "${params.locale}") {
        ... on FixedPage_Entry {
          id
          ${seoEntry}
        }
      }
    }`,
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

async function getPage({ language }) {
  return fetchData(FixedPageQuery({ page: "cadeaubonEntries", language }));
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
  const transparentImage = page[0]?.transparentImage?.[0];

  console.log(transparentImage);
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
      <Bookeo locale={params.locale} variant="voucher" />
      <ImageWrapper image={transparentImage}>
        {sections?.map((section) => renderComponents(section, params.locale))}
      </ImageWrapper>{" "}
    </>
  );
}
