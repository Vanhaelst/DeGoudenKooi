import React from "react";
import { fetchData } from "@/utils/fetchData";
import { Loader } from "@/components/atoms/loader/loader";
import { imageQuery } from "@/queries/entries/image";
import GamePage from "@/app/[locale]/overzicht/[game]/gamePage";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";

const query = ({ slug, language = "nl" }) => {
  return `
        query MyQuery {
              rooms: roomsEntries(slug: "${slug}", language: "${language}") {
                  ... on game_Entry {
                      title
                      story
                      videoId
                      categories
                      videoPlayer
                      detailImage ${imageQuery}
                      featuredDetailImage ${imageQuery}
                      featuredImage ${imageQuery}
                      backgroundImage ${imageQuery}
                      inactiveMessage
                      inactiveFrom
                      inactiveTill
                      gameLocation
                      gameType
                      categories
                      time
                      players
                      slug: uri
                      price2
                      price3
                      price4
                      price5
                      price6
                  }
              }
        }
  `;
};

async function getRoom({ params }) {
  return fetchData(
    query({
      slug: params.game,
      language: params.locale,
    }),
  );
}

export async function generateMetadata({ params }) {
  const { rooms } = await fetchData(
    `query MyQuery {
              rooms: roomsEntries(slug: "${params.game}", language: "${params.locale}") {
                  ... on game_Entry {
                      title
                      ${seoEntry}
                  }
              }
        }`,
  );

  const { title, seoTitle, seoDescription, seoKeywords, seoUrl, seoImage } =
    rooms?.[0];

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;

  return {
    ...defaultMetadata,
    title: seoTitle || title || defaultMetadata.title,
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

export default async function Game({ params }) {
  const { rooms } = await getRoom({ params });

  if (!rooms) {
    return <Loader />;
  }

  return <GamePage data={rooms[0]} locale={params.locale} />;
}
