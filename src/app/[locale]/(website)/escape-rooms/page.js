import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { roomsQuery } from "@/queries/sections/rooms";
import { renderComponents } from "@/utils/renderComponents";
import { GamesOverview } from "@/components/organisms/gamesOverview/gamesOverview";
import React from "react";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { SeoQuery } from "@/queries/sections/seo";
import { Badges } from "@/components/organisms/badges/badges";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "overviewEntries", language }));
}

async function getRooms({ language }) {
  return fetchData(roomsQuery({ language }));
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "overviewEntries", language: params.locale }),
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

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });
  const { rooms } = await getRooms({ language: params.locale });

  const dict = await getDictionary(params.locale);

  const sections = page[0]?.sections;
  const transparentImage = page[0]?.transparentImage?.[0];

  return (
    <>
      <section
        className={`py-10 md:py-20 lg:pt-32 lg:pb-80 bg-bottom bg-cover`}
        style={{
          backgroundImage: `url('/hero-badges.png')`,
        }}
      >
        <Badges
          defaultRooms={rooms}
          dict={dict}
          filter={true}
          locale={params.locale}
        />
      </section>

      <ImageWrapper image={transparentImage}>
        <GamesOverview defaultRooms={rooms} t={dict} locale={params.locale} />

        {sections?.map((section) => renderComponents(section, params.locale))}
      </ImageWrapper>
    </>
  );
}
