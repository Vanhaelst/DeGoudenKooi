import React from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { Button, Container, RichText, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import Image from "next/image";

async function getGames() {
  return fetchData(roomsQuery({ type: "" }));
}

export const GamesOverview = async ({
  title,
  description,
  gameType,
  gameLocation,
}) => {
  const { rooms } = await getGames();

  // console.log("rooms", rooms);
  // console.log(gameType, gameLocation);

  const location = gameLocation;
  return (
    <section className="bg-[#F7F6F2] py-24 sm:py-32">
      <Container classnames="mb-24">
        <Title title={title} description={description} />
      </Container>
      {rooms.map(
        ({ title, story, featuredImage, slug, players, time }, index) => {
          const isEven = index % 2 === 0;
          return (
            <Container key={slug} classnames="">
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-12">
                <div
                  className={`relative lg:col-span-7 ${isEven ? "order-1" : "order-2"}`}
                >
                  <div
                    className="absolute inset-px rounded-lg bg-cover bg-center bg-secondary-500 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
                    style={{
                      backgroundImage: `url('${featuredImage[0]?.url}')`,
                    }}
                  />
                  <div className="relative flex h-full justify-between flex-col p-6 overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                    <Text as="h5" level="lg" classnames="text-white mb-4">
                      {title}
                    </Text>
                    <Button
                      variant="white"
                      href={slug}
                      callToAction="Boek nu"
                      size="small"
                    />
                  </div>
                </div>
                <div
                  className={`relative lg:col-span-5 ${isEven ? "order-2" : "order-1"}`}
                >
                  <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                    <div className="p-10 pt-4">
                      <Text
                        as="h5"
                        level="lg"
                        classnames="text-secondary-500 mb-4"
                      >
                        Het verhaal
                      </Text>
                      <RichText text={story} classnames="text-primary-700" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
                </div>
                <div className="relative lg:col-span-12 flex order-3">
                  <div className="flex mr-4">
                    <Image
                      src="/icon-group.svg"
                      alt="zandloper"
                      className="mr-2"
                      width={21}
                      height={14}
                    />
                    <Text classnames="text-secondary-500">{players}</Text>
                  </div>

                  <div className="flex mr-4">
                    <Image
                      src="/icon-hourglass.svg"
                      alt="zandloper"
                      className="mr-2"
                      width={13}
                      height={16}
                    />
                    <Text classnames="text-secondary-500">{time}</Text>
                  </div>

                  <div className="flex mr-4">
                    <Image
                      src="/icon-hourglass.svg"
                      alt="zandloper"
                      className="mr-2"
                      width={13}
                      height={16}
                    />
                    <Text classnames="text-secondary-500">{location}</Text>
                  </div>
                </div>
              </div>
            </Container>
          );
        },
      )}
    </section>
  );
};
