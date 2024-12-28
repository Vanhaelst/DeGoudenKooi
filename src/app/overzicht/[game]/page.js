"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { ContentImage } from "@/components/organisms/content/content-image";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import { Prices } from "@/components/molecules/prices/prices";
import { usePathname } from "next/navigation";
import { Hero } from "@/components/molecules/hero/hero";
import { Faq } from "@/components/molecules/faq/faq";
import { Loader } from "@/components/atoms/loader/loader";
import { imageQuery } from "@/queries/entries/image";

const query = ({ pathname }) => {
  return `
        query MyQuery {
              rooms: roomsEntries(uri: "${pathname?.slice(1)}") {
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

export default function Game() {
  const [data, setData] = useState(undefined);
  const pathname = usePathname();

  useEffect(() => {
    fetchData(query({ pathname })).then((res) => {
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
    price2,
    price3,
    price4,
    price5,
    price6,
  } = data || {};

  const prices = [
    { players: 2, price: price2 },
    { players: 3, price: price3 },
    { players: 4, price: price4 },
    { players: 5, price: price5 },
    { players: 6, price: price6 },
  ];

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Hero
        type={videoId ? "video" : "horizontal"}
        videoId={videoId}
        videoPlayer={videoPlayer}
        title={title}
        image={detailImage || featuredImage}
        backgroundImage={backgroundImage}
        awards={true}
      />

      <div className={`py-24 sm:py-32`}>
        <ContentImage
          title="Het verhaal"
          description={story}
          image={featuredImage}
          order={false}
        />
      </div>

      <Prices title="Tarieven" prices={prices} />
      <Bookeo />

      <Faq backgroundColor="lightGray" />
    </>
  );
}
