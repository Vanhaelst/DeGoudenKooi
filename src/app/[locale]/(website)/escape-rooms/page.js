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

async function getPage({ language, token }) {
  return fetchData(PageQuery({ page: "overviewEntries", language }), {}, token);
}

async function getRooms({ language, token }) {
  return fetchData(roomsQuery({ language }), {}, token);
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

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });
  const { rooms } = await getRooms({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });

  const dict = await getDictionary(params.locale);

  const sections = page[0]?.sections;
  const transparentImage = page[0]?.transparentImage?.[0];

  return (
    <>
      <section
        className={`py-10 md:py-20 lg:py-0 lg:pt-32 lg:pb-44 bg-bottom bg-cover`}
        style={{
          backgroundImage: `url('/hero-badges.webp')`,
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
