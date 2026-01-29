import { fetchData, REVALIDATE } from "@/utils/fetchData";
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
import { seoEntry } from "@/queries/entries/seo";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";

export const fetchCache = "force-no-store";

async function getPage({ language, token }) {
  return fetchData(
    FixedPageQuery({ page: "reserveEntries", language }),
    {
      revalidate: REVALIDATE,
      tags: [`page-reserveEntries`, `language-${language}`],
    },
    token,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `query MyQuery {
      page: reserveEntries(language: "${params.locale}") {
        ... on FixedPage_Entry {
          id
          ${seoEntry}
        }
      }
    }`,
    {
      revalidate: REVALIDATE,
      tags: [`metadata-reserveEntries`, `language-${params.locale}`],
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

  const {
    title,
    description,
    image,
    buttons,
    type,
    textColor,
    backgroundColor,
    backgroundImage,
    sections,
  } = page[0] ?? {};
  const transparentImage = page[0]?.transparentImage?.[0];

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
        textColor={textColor}
      />
      <div className="-my-24">
        <Bookeo locale={params.locale} variant="main" />
      </div>
      <ImageWrapper image={transparentImage}>
        {sections?.map((section) => renderComponents(section, params.locale))}
      </ImageWrapper>
    </>
  );
}
