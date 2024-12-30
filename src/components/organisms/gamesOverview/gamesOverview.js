"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { Button, Container, RichText, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import Image from "next/image";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { useSearchParams } from "next/navigation";
import { awardsQuery } from "@/queries/sections/awards";

export const GamesOverview = ({
  title,
  description,
  gameLocation,
  backgroundColor,
}) => {
  const [rooms, setRooms] = useState([]);
  const [awards, setAwards] = useState([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const locationSearch = searchParams.get("location")?.toString();
    const typeSearch = searchParams.get("type")?.toString();

    const location = locationSearch ? `"${locationSearch}"` : undefined;
    const type = typeSearch ? `"${typeSearch}"` : undefined;

    fetchData(roomsQuery({ type, location }))
      .then((res) => {
        setRooms(res.rooms);
      })
      .catch((e) => console.log("error", e));

    fetchData(awardsQuery({}))
      .then((res) => {
        setAwards(res.awards);
      })
      .catch((e) => console.log("error", e));
  }, [searchParams]);

  const bgColor = getBackgroundColor(backgroundColor);

  const location = gameLocation;

  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="mb-24">
        <Title title={title} description={description} />
      </Container>

      {rooms.map(
        (
          { title, story, featuredImage, slug, players, time, categories },
          index,
        ) => {
          const isEven = index % 2 === 0;
          const roomAwards = awards.filter((award) =>
            award.categories.includes(categories[0]),
          );

          return (
            <Container key={slug} classnames="">
              <div className="mt-10 grid grid-cols-1 lg:gap-4 sm:mt-16 lg:grid-cols-12">
                <div
                  className={`relative lg:col-span-5 min-h-60 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div
                    className="absolute inset-px lg:rounded-lg bg-contain bg-no-repeat bg-center max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] perspective"
                    style={{
                      backgroundImage: `url('${featuredImage[0]?.url}')`,
                    }}
                  />
                </div>
                <div
                  className={`relative lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="absolute inset-px lg:rounded-lg bg-white lg:rounded-tr-[2rem]" />
                  <div className="relative flex h-full flex-col overflow-hidden lg:rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                    <div className="px-10 pt-10 pb-4 min-h-[500px] flex flex-col justify-between">
                      <div>
                        <Text
                          as="h5"
                          level="2xl"
                          classnames="text-secondary-500 mb-4"
                        >
                          {title}
                        </Text>
                        <RichText
                          text={story}
                          classnames="text-primary-700 mb-4"
                        />
                        <Button
                          variant="primary-outline"
                          classnames="mr-2"
                          href={slug}
                          callToAction="Meer weten"
                          size="small"
                        />
                        <Button
                          variant="secondary"
                          href={slug}
                          callToAction="Boek nu"
                          size="small"
                        />

                        <div className="group flex mt-6">
                          {roomAwards.map(({ image, title }) => {
                            return (
                              <div
                                key={title}
                                className="tooltip hover:tooltip-open tooltip-bottom mr-2"
                                data-tip={title}
                              >
                                <img
                                  src={image[0].url}
                                  alt={title}
                                  className="h-12 hover:scale-125 transition-all"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="relative lg:col-span-12 flex order-3 mt-6">
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
                          <Text classnames="text-secondary-500">
                            {location}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-px lg:rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
                </div>
              </div>
            </Container>
          );
        },
      )}
    </section>
  );
};
