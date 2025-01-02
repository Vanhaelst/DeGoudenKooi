import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { roomsQuery } from "@/queries/sections/rooms";
import { renderComponents } from "@/utils/renderComponents";
import { Text } from "@/components/atoms";
import { GamesOverview } from "@/components/organisms/gamesOverview/gamesOverview";
import React from "react";
import { defaultMetadata } from "@/data/metadata";

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

  const sections = page[0]?.sections;

  const bgColor = "bg-white";
  return (
    <>
      <section className={`${bgColor} pt-24 pb-12`}>
        <div className="badges w-full flex justify-center">
          <div className="flex overflow-x-scroll space-x-5 hide-scrollbar px-10">
            {rooms.map(({ featuredImage, title, slug, gameLocation }) => (
              <a
                key={title}
                href={slug}
                className={`group w-72 min-w-72 flex flex-col items-center hover:grayscale-0 duration-200 ${gameLocation === searchParams.location ? "" : "grayscale"}`}
              >
                <img
                  src={featuredImage[0].url}
                  alt={title}
                  className="px-8 mb-2"
                />
                <Text
                  as="span"
                  level="sm"
                  classnames="text-center transition-all group-hover:font-bold group-hover:scale-110 group-hover:text-primary-500"
                >
                  {title}
                </Text>
              </a>
            ))}
          </div>
        </div>
      </section>

      <GamesOverview
        title={`${searchParams.location ? `Onze belevingen op locatie "${searchParams.location}"` : "Al onze belevingen"}`}
        backgroundColor="lightGray"
      />

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
