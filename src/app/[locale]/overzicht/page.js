import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { roomsQuery } from "@/queries/sections/rooms";
import { renderComponents } from "@/utils/renderComponents";
import { Container, Text } from "@/components/atoms";
import { GamesOverview } from "@/components/organisms/gamesOverview/gamesOverview";
import React from "react";
import { defaultMetadata } from "@/data/metadata";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { Title } from "@/components/molecules";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "overviewEntries", language }));
}

async function getRooms({ language }) {
  return fetchData(roomsQuery({ language }));
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Escape games - De Gouden Kooi",
        description:
          "Escape experiences ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
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
          description:
            "Onze escape experience is de next-level escape room in Mechelen met meer immersie. Ga jij de uitdaging aan? Ontdek het unieke thema en reserveer online!",
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
