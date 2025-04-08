import React from "react";
import { fetchData } from "@/utils/fetchData";
import { Loader } from "@/components/atoms/loader/loader";
import { imageQuery } from "@/queries/entries/image";
import GamePage from "./gamePage";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";
import { buttonsQuery } from "@/queries/entries/buttons";
import { Badges } from "@/components/organisms/badges/badges";
import { roomsQuery } from "@/queries/sections/rooms";
import { getDictionary } from "@/app/[locale]/dictionaries";

const query = ({ slug, language = "nl" }) => {
  return `
        query MyQuery {
              room: roomsEntries(slug: "${slug}", language: "${language}") {
                  ... on game_Entry {
                      title
                      featuredImage ${imageQuery}
                      mainBackground ${imageQuery}

                      heroTitle
                      heroSubTitle
                      backgroundImage ${imageQuery}
                      detailImage ${imageQuery}

                      contentItem {
                        ... on text_Entry {
                            id
                            typeHandle
                            title
                            description
                            columns
                            buttons ${buttonsQuery}
                        }
                        ... on contentImage_Entry {
                            id
                            typeHandle
                            title
                            description
                            buttons ${buttonsQuery}
                            image ${imageQuery}
                            order
                        }
                        ... on twoColumns_Entry {
                          id
                          typeHandle
                          title
                          descriptionLeft
                          descriptionRight
                          buttons ${buttonsQuery}
                        }
                    }
                      transparentImage ${imageQuery}
                      
                      
                      videoId
                      videoPlayer
                      videoImage ${imageQuery}
                      
                      uspHeading
                      uspDescription
                      usps {
                        ... on feature_Entry {
                          title
                          description
                          icon: featureIcon ${imageQuery}
                        }
                      }
      
                      reviews: review {
                        ... on review_Entry {
                          id
                          title
                          description
                        }
                      }
                      
                      categories

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
                      priceImage ${imageQuery}
                  }
              }
        }
  `;
};

async function getRooms({ language }) {
  return fetchData(roomsQuery({ language }));
}
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

  const { title, seoTitle, seoDescription, seoKeywords, seoImage } =
    rooms?.[0] ?? {};

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
      url: defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

export default async function Game({ params }) {
  const { rooms } = await getRooms({ language: params.locale });
  const { room } = await getRoom({ params });

  const dict = await getDictionary(params.locale);

  if (!room) {
    return <Loader />;
  }

  return (
    <>
      <GamePage data={room[0]} locale={params.locale}>
        <section
          className={`py-20 bg-bottom bg-cover`}
          style={{
            backgroundImage: `url('/hero-badges-scheur.webp')`,
          }}
        >
          <Badges defaultRooms={rooms} dict={dict} />
        </section>
      </GamePage>
    </>
  );
}
