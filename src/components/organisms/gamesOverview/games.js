"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button, Container, RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Games = ({
  title,
  story,
  featuredImage,
  slug,
  players,
  time,
  categories,
  gameLocation,
  index,
  awards,
  t,
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  const isEven = index % 2 === 0;
  const roomAwards = awards?.filter((award) =>
    award.categories.includes(categories[0]),
  );

  return (
    <Container key={slug} classnames="">
      <div
        className="mt-10 grid grid-cols-1 lg:gap-4 sm:mt-16 lg:grid-cols-12"
        ref={elementRef}
      >
        <div
          className={`relative lg:col-span-5 aspect-[16/12] md:min-h-60 ${isEven ? "lg:order-1" : "lg:order-2"}`}
        >
          <div
            className=" absolute inset-px lg:rounded-lg w-[70%] md:w-full mx-auto bg-contain md:bg-cover lg:bg-contain bg-no-repeat bg-center max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] perspective"
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
                  classnames="text-secondary-500 mb-4 font-bold"
                >
                  {title}
                </Text>
                <RichText
                  text={story}
                  level="lg"
                  classnames="text-primary-700 mb-4 font-light"
                />
                <div className="space-x-3">
                  <Button
                    variant="primary-outline"
                    href={slug}
                    callToAction="MEER WETEN"
                    size="medium"
                  />
                  <Button
                    variant="secondary"
                    href={slug}
                    callToAction="BOEK NU"
                    size="medium"
                  />
                </div>

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
                    src="/icon-group-dark.svg"
                    alt="zandloper"
                    className="mr-2"
                    width={21}
                    height={14}
                  />
                  <Text classnames="text-secondary-500">{players}</Text>
                </div>
                <div className="flex mr-4">
                  <Image
                    src="/icon-hourglass-dark.svg"
                    alt="zandloper"
                    className="mr-2"
                    width={13}
                    height={16}
                  />
                  <Text classnames="text-secondary-500">{time}</Text>
                </div>
                <div className="flex mr-4">
                  <Image
                    src="/icon-location-dark.svg"
                    alt="zandloper"
                    className="mr-2"
                    width={20}
                    height={20}
                  />
                  <Text classnames="text-secondary-500">
                    {t.general[gameLocation]}
                  </Text>
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
