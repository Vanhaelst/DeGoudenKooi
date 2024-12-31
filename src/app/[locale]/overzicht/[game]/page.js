"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { ContentImage } from "@/components/organisms/content/content-image";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import { Prices } from "@/components/molecules/prices/prices";
import { usePathname } from "next/navigation";
import { Hero } from "@/components/molecules/hero/hero";
import { Faq } from "@/components/molecules/faq/faq";
import { Loader } from "@/components/atoms/loader/loader";
import { imageQuery } from "@/queries/entries/image";
import { Video } from "@/components/molecules/video/video";
import { Container, Text } from "@/components/atoms";
import Image from "next/image";
import { faqQuery } from "@/queries/sections/faq";

const query = ({ pathname, language = "nl" }) => {
  return `
        query MyQuery {
              rooms: roomsEntries(uri: "${pathname?.slice(4)}", language: "${language}") {
                  ... on game_Entry {
                      title
                      story
                      videoId
                      videoPlayer
                      detailImage ${imageQuery}
                      featuredImage ${imageQuery}
                      backgroundImage ${imageQuery}
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
                  }
              }
        }
  `;
};

export default function Game({ params }) {
  const [data, setData] = useState(undefined);
  const [faq, setFaq] = useState(undefined);
  const pathname = usePathname();

  useEffect(() => {
    fetchData(query({ pathname, language: params.locale })).then((res) => {
      setData(res.rooms?.[0]);
    });
  }, []);

  const {
    title,
    featuredImage,
    detailImage,
    backgroundImage,
    story,
    videoId,
    videoPlayer,
    players,
    time,
    categories,
    gameLocation,
    price2,
    price3,
    price4,
    price5,
    price6,
  } = data || {};

  useEffect(() => {
    if (!categories) {
      return;
    }
    fetchData(faqQuery({ categories })).then((res) => {
      setFaq(res.faq);
    });
  }, [categories]);

  const prices = [
    { players: 2, price: price2 },
    { players: 3, price: price3 },
    { players: 4, price: price4 },
    { players: 5, price: price5 },
    { players: 6, price: price6 },
  ];

  const features = [
    {
      icon: "/icon-hourglass.svg",
      title: "Locatie",
      description: gameLocation,
      classes: "",
    },
    {
      icon: "/icon-group.svg",
      title: "Aantal",
      description: players,
      classes: "hidden lg:flex",
    },
    {
      icon: "/icon-hourglass.svg",
      title: "Duurtijd",
      description: time,
      classes: "hidden sm:flex",
    },
  ];

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Hero
        type={"horizontal"}
        image={detailImage || featuredImage}
        backgroundImage={backgroundImage}
        awards={true}
      />

      <Container classnames="relative -translate-y-8 lg:-translate-y-1/2">
        <div className="rounded-2xl border border-secondary-500 bg-white p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:divide-x divide-secondary-500">
          {features.map(({ title, description, classes }) => (
            <div
              className={`flex items-center justify-center ${classes}`}
              key={title}
            >
              <Image
                src="/icon-hourglass.svg"
                alt="zandloper"
                className="mr-6 w-16 h-16 border-2 rounded-full p-2 border-secondary-500"
                width={13}
                height={16}
              />
              <div className="flex flex-col">
                <Text
                  as={"span"}
                  level="md"
                  classnames="text-bold text-secondary-500"
                >
                  {title}
                </Text>
                <Text
                  as={"span"}
                  level="sm"
                  classnames="font-light text-secondary-500"
                >
                  {description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div className={`py-14`}>
        <ContentImage
          title={title}
          description={story}
          image={featuredImage}
          order={false}
        />
      </div>

      <Video
        title={`Teaser: ${title}`}
        videoId={videoId}
        videoPlayer={videoPlayer}
        backgroundColor={"lightGray"}
        halfBg={true}
      />

      <Prices title="Tarieven" prices={prices} />
      <Bookeo />

      <Faq backgroundColor="lightGray" faq={faq} />
    </>
  );
}
