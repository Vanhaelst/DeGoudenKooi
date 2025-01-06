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

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({ language: params.locale });
  const { rooms } = await getRooms({ language: params.locale });

  const dict = await getDictionary(params.locale);

  const sections = page[0]?.sections;

  const bgColor = "bg-white";

  return (
    <>
      <GamesOverview
        title={`${searchParams.location ? `Onze belevingen op locatie "${dict.general[searchParams.location]}"` : "Al onze belevingen"}`}
        backgroundColor="lightGray"
        t={dict}
      />

      <section className={`${bgColor} py-32 lg:py-40`}>
        <Container>
          <Title title={dict.general.discover_all} showIcon={false} />
        </Container>
        <div className="badges w-full flex justify-center mt-12">
          <div className="flex overflow-x-scroll space-x-5 hide-scrollbar px-10">
            {rooms.map(
              ({ featuredImage, title, slug, gameLocation, gameType }) => (
                <a
                  key={title}
                  href={slug}
                  className={`group w-72 min-w-72 flex flex-col items-center hover:grayscale-0 duration-200 hover:opacity-100 ${gameLocation === searchParams.location ? "lg:opacity-75" : "lg:opacity-75"}`}
                >
                  <img
                    src={featuredImage[0].url}
                    alt={title}
                    className="px-8 mb-2"
                  />
                  <Text
                    as="span"
                    level="sm"
                    classnames="text-center transition-all group-hover:font-bold group-hover:scale-110 font-light lg:text-gray-700 group-hover:text-primary-500"
                  >
                    {dict.general[gameType]}
                  </Text>
                  <Text
                    as="span"
                    level="sm"
                    classnames="text-center transition-all group-hover:font-bold group-hover:scale-110 group-hover:text-primary-500"
                  >
                    {title}
                  </Text>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
