import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { roomsQuery } from "@/queries/sections/rooms";
import { renderComponents } from "@/utils/renderComponents";
import { Text } from "@/components/atoms";
import { GamesOverview } from "@/components/organisms/gamesOverview/gamesOverview";
import React from "react";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "overviewEntries", language }));
}

async function getRooms({ language }) {
  return fetchData(roomsQuery({ language }));
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

      {sections?.map((section) => renderComponents(section))}
    </>
  );
}
