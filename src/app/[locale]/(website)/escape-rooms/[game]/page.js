import React from "react";
import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { Loader } from "@/components/atoms/loader/loader";
import { imageQuery } from "@/queries/entries/image";
import GamePage from "./gamePage";
import {
  defaultMetadata,
  getAlternates,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";
import { buttonsQuery } from "@/queries/entries/buttons";
import { Badges } from "@/components/organisms/badges/badges";
import { roomsQuery } from "@/queries/sections/rooms";
import { getDictionary } from "@/app/[locale]/dictionaries";
import {
  absoluteUrl,
  breadcrumbSchema,
  cleanText,
  createJsonLd,
  getPageUrl,
  getSeoValues,
  JsonLdScript,
  SITE_URL,
  webpageSchema,
} from "@/utils/jsonLd";

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

async function getRooms({ language, token }) {
  return fetchData(roomsQuery({ language }), {}, token);
}
async function getRoom({ params, token }) {
  return fetchData(
    query({
      slug: params.game,
      language: params.locale,
    }),
    {
      revalidate: REVALIDATE,
      tags: [`page-${params.game}`, `language-${params.locale}`],
    },
    token,
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
    {
      revalidate: REVALIDATE,
      tags: [`metadata-${params.game}`, `language-${params.locale}`],
    },
  );

  const { title, seoTitle, seoDescription, seoKeywords, seoImage } =
    rooms?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;

  return {
    ...defaultMetadata,
    alternates: getAlternates({
      locale: params.locale,
      path: `escape-rooms/${params.game}`,
    }),
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

export default async function Game({ params, searchParams }) {
  const { rooms } = await getRooms({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });
  const { room } = await getRoom({
    params,
    token: searchParams["x-craft-live-preview"],
  });

  const dict = await getDictionary(params.locale);

  if (!room) {
    return <Loader />;
  }

  const currentRoom = room[0];
  const prices = [
    currentRoom?.price2,
    currentRoom?.price3,
    currentRoom?.price4,
    currentRoom?.price5,
    currentRoom?.price6,
  ]
    .map((price) => Number.parseFloat(price))
    .filter((price) => Number.isFinite(price) && price > 0);
  const path = `escape-rooms/${params.game}`;
  const webPage = webpageSchema({
    locale: params.locale,
    path,
    page: currentRoom,
    type: "ItemPage",
  });
  const seo = getSeoValues({ locale: params.locale, page: currentRoom });
  const roomImage =
    currentRoom?.featuredImage?.[0]?.url ||
    currentRoom?.detailImage?.[0]?.url ||
    currentRoom?.backgroundImage?.[0]?.url;
  const gameSchema = {
    "@type": ["Product", "Service"],
    "@id": `${webPage.url}#game`,
    name: currentRoom?.title,
    description: cleanText(
      currentRoom?.heroSubTitle || currentRoom?.story || webPage.description,
    ),
    image: roomImage ? absoluteUrl(roomImage) : seo.image,
    url: webPage.url,
    brand: {
      "@id": `${SITE_URL}/#organization`,
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    category: currentRoom?.gameType,
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: currentRoom?.categories?.find((category) =>
        /^\d+$/.test(category),
      ),
    },
    offers: prices.length
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
          offerCount: prices.length,
          availability: currentRoom?.inactiveMessage
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/InStock",
          url: getPageUrl(
            params.locale,
            params.locale === "en" ? "booking" : "boeking",
          ),
        }
      : undefined,
  };
  const jsonLd = createJsonLd([
    webPage,
    gameSchema,
    breadcrumbSchema({
      locale: params.locale,
      items: [
        {
          name: dict.navigation.games,
          url: getPageUrl(params.locale, "escape-rooms"),
        },
        { name: currentRoom?.title, url: webPage.url },
      ],
    }),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <GamePage data={currentRoom} locale={params.locale}>
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
