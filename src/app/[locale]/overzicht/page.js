import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { roomsQuery } from "@/queries/sections/rooms";
import { renderComponents } from "@/utils/renderComponents";
import { Container, Text } from "@/components/atoms";
import { GamesOverview } from "@/components/organisms/gamesOverview/gamesOverview";
import React from "react";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { Title } from "@/components/molecules";
import { SeoQuery } from "@/queries/sections/seo";
import { Badges } from "@/components/organisms/badges/badges";

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

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({ language: params.locale });
  const { rooms } = await getRooms({ language: params.locale });

  const dict = await getDictionary(params.locale);

  const sections = page[0]?.sections;

  return (
    <>
      <section className={`pt-32 lg:py-40`}>
        <Container>
          <Title title={dict.general.discover_all} showIcon={false} />
        </Container>

        <Badges rooms={rooms} searchParams={searchParams} dict={dict} />
      </section>

      <GamesOverview
        title={`${searchParams.location ? `Onze belevingen op locatie "${dict.general[searchParams.location]}"` : ""}`}
        t={dict}
      />

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
