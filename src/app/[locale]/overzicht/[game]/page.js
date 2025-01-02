import React from "react";
import { fetchData } from "@/utils/fetchData";
import { Loader } from "@/components/atoms/loader/loader";
import { imageQuery } from "@/queries/entries/image";
import { awardsQuery } from "@/queries/sections/awards";
import GamePage from "@/app/[locale]/overzicht/[game]/gamePage";
import { defaultMetadata } from "@/data/metadata";

const query = ({ slug, language = "nl" }) => {
  return `
        query MyQuery {
              rooms: roomsEntries(slug: "${slug}", language: "${language}") {
                  ... on game_Entry {
                      title
                      story
                      videoId
                      videoPlayer
                      detailImage ${imageQuery}
                      featuredDetailImage ${imageQuery}
                      featuredImage ${imageQuery}
                      backgroundImage ${imageQuery}
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

async function getAwards() {
  return fetchData(awardsQuery({ grade: "" }));
}

export async function generateMetadata({ params }) {
  const { rooms } = await fetchData(
    query({
      slug: params.game,
      language: params.locale,
    }),
  );

  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: `${rooms?.[0]?.title} - De Gouden Kooi`,
        description:
          "Escape experiences ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          image: rooms?.[0]?.featuredImage?.[0]?.url,
          description:
            "Escape experiences ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Escape games - De Gouden Kooi",
        description:
          "Onze escape experience is de next-level escape room in Mechelen met meer immersie. Ga jij de uitdaging aan? Ontdek het unieke thema en reserveer online!",
        openGraph: {
          ...defaultMetadata.openGraph,
          image: data?.featuredImage?.[0]?.url,
          description:
            "Onze escape experience is de next-level escape room in Mechelen met meer immersie. Ga jij de uitdaging aan? Ontdek het unieke thema en reserveer online!",
        },
      };
}

export default async function Game({ params }) {
  const { rooms } = await getRoom({ params });
  const { awards } = await getAwards();

  if (!rooms) {
    return <Loader />;
  }

  return <GamePage data={rooms[0]} locale={params.locale} awards={awards} />;
}
