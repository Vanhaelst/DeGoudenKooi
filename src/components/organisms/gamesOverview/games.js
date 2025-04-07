"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button, Container, RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { awardsQuery } from "@/queries/sections/awards";
import { clsx } from "clsx";
import { formatPrice } from "@/utils/formatPrice";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
gsap.registerPlugin(ScrollTrigger);

export const Games = ({
  title,
  story,
  background,
  featuredImage,
  slug,
  players,
  time,
  gameLocation,
  categories,
  price6,
  index,
  locale,
  gameType,
  t,
}) => {
  const elementRef = useRef(null);
  const featuresRef = useRef(null);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  useEffect(() => {
    fetchData(
      awardsQuery({
        locale: locale,
        visibility: "overview",
        categories: categories,
      }),
    )
      .then((res) => {
        setAwards(res.awards);
      })
      .catch((e) => console.error(e));
  }, []);

  const isEven = index % 2 === 0;

  const features = [
    {
      icon: "/icon-location.svg",
      description: t.general[gameLocation],
      classes: "",
    },
    {
      icon: "/icon-hourglass-2.svg",
      description: time,
      classes: "",
    },
    {
      icon: "/icon-group.svg",
      description: players,
      classes: "",
    },
    {
      icon: "/icon-age.svg",
      description: t.general.minAge,
      classes: "hidden lg:flex",
      tooltip: t.game.minAge,
    },
    {
      icon: "/icon-coins.svg",
      description: `${t.general.from} ${formatPrice(price6 / 6)} p.p.`,
      classes: "",
    },
  ];

  return (
    <Container
      key={slug}
      classnames={clsx(background[0]?.url ? "bg-cover" : "")}
      style={{ backgroundImage: `url('${background?.[0]?.url}')` }}
    >
      <div
        className="mt-10 grid grid-cols-1 lg:gap-4 sm:mt-16 lg:grid-cols-12 opacity-0"
        ref={elementRef}
      >
        <div
          className={`relative lg:col-span-5 aspect-[16/12] lg:aspect-auto lg:min-h-60 ${isEven ? "lg:order-1" : "lg:order-2"}`}
        >
          <div
            className=" absolute inset-px lg:rounded-lg w-[70%] md:w-[50%] lg:w-full lg:h-[80%] mt-[10%] mx-auto bg-contain md:bg-cover lg:bg-contain bg-no-repeat bg-center max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] perspective"
            style={{
              backgroundImage: `url('${featuredImage[0]?.url}')`,
            }}
          />
        </div>
        <div
          className={`relative lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="absolute lg:rounded-lg lg:rounded-tr-[2rem]" />
          <div className="relative flex h-full flex-col overflow-hidden lg:rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
            <div className="px-10 pt-10 pb-4 min-h-[500px] flex flex-col justify-between">
              <div>
                <Text
                  as="h5"
                  level="3xl"
                  classnames="text-white font-bold text-center lg:text-left"
                >
                  {title}
                </Text>
                <RichText
                  text={story}
                  level="lg"
                  classnames={clsx(
                    "text-white font-light text-center lg:text-left",
                    gameType ? "mb-2" : "pb-6 lg:mb-4",
                  )}
                />
                {gameType ? (
                  <Text
                    as={"p"}
                    level="sm"
                    classnames={clsx(
                      "font-semibold text-white text-center lg:text-left",
                      gameType ? "pb-6 lg:mb-4" : "mb-2",
                    )}
                  >
                    {t.general[gameType]}
                  </Text>
                ) : null}

                {features && (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-y-4"
                    ref={featuresRef}
                  >
                    {features.map(({ title, description, classes, icon }) => {
                      return (
                        <div
                          className={`flex items-center justify-center lg:justify-start ${classes}`}
                          key={title}
                        >
                          <Image
                            src={icon}
                            alt={description || ""}
                            className="mr-3 w-6 h-6 sm:w-10 sm:h-10"
                            width={13}
                            height={16}
                          />
                          <div className="flex flex-col">
                            <Text
                              as={"span"}
                              level="sm"
                              classnames="font-semibold text-white"
                            >
                              {description}
                            </Text>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="group flex my-6 justify-center lg:justify-start flex-wrap">
                  {awards &&
                    awards.length > 0 &&
                    awards.map(({ image, title }) => {
                      return (
                        <div key={title} className="mr-2 mb-2" data-tip={title}>
                          <img
                            src={image[0]?.url}
                            alt={title || ""}
                            className="h-12"
                          />
                        </div>
                      );
                    })}
                </div>

                <div className="space-x-3 grid grid-cols-2 sm:flex justify-center lg:justify-start">
                  <div className="mx-auto sm:mx-0">
                    <Button
                      variant="white-outline"
                      href={`/${slug}`}
                      callToAction={t.game.moreInfo.toUpperCase()}
                      size="medium"
                      classnames=""
                    />
                  </div>
                  <div className="mx-auto sm:mx-0">
                    <Button
                      variant="primary"
                      href={`/${slug}#book`}
                      callToAction={t.game.book.toUpperCase()}
                      size="medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute lg:rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
        </div>
      </div>
    </Container>
  );
};
