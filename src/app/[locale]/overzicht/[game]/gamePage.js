"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { ContentImage } from "@/components/organisms/content/content-image";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import { Prices } from "@/components/molecules/prices/prices";
import { Hero } from "@/components/molecules/hero/hero";
import { Faq } from "@/components/molecules/faq/faq";
import { Loader } from "@/components/atoms/loader/loader";
import { Video } from "@/components/molecules/video/video";
import { Container, Text } from "@/components/atoms";
import Image from "next/image";
import { faqQuery } from "@/queries/sections/faq";
import { AwardSlider } from "@/components/molecules/awardSlider/awards";
import { CompanyData } from "@/data/companyData";

import nl from "@/app/[locale]/dictionaries/nl.json";
import en from "@/app/[locale]/dictionaries/en.json";
import Warning from "@/components/molecules/alerts/warning";
import { imageQuery } from "@/queries/entries/image";

export default function GamePage({ data, locale }) {
  const [faq, setFaq] = useState(undefined);
  const [awards, setAwards] = useState(undefined);
  const t = locale === "nl" ? nl : en;

  const {
    title,
    featuredImage,
    featuredDetailImage,
    detailImage,
    backgroundImage,
    inactiveMessage,
    inactiveFrom,
    inactiveTill,
    story,
    videoId,
    videoPlayer,
    players,
    time,
    categories,
    gameLocation,
    gameType,
    price2,
    price3,
    price4,
    price5,
    price6,
  } = data || {};

  const isInactive =
    new Date() >= new Date(inactiveFrom) &&
    new Date() <= new Date(inactiveTill);

  useEffect(() => {
    if (!categories) {
      return;
    }
    fetchData(faqQuery({ categories })).then((res) => {
      setFaq(res.faq);
    });

    fetchData(`query MyQuery {
        awards: awardsEntries(categories: ["${categories}"]) {
            ...on award_Entry {
            title
            description
            image: awardimage ${imageQuery}
            class
            categories
            }
          }          
  }  `).then((res) => {
      setAwards(res.awards);
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
      icon: "/icon-location.svg",
      title: t.general.location,
      description: t.general[gameLocation],
      classes: "",
    },
    {
      icon: "/icon-group.svg",
      title: t.general.amount,
      description: players,
      classes: "hidden lg:flex",
    },
    {
      icon: "/icon-hourglass.svg",
      title: t.general.time,
      description: time,
      classes: "hidden sm:flex",
    },
  ];

  const reserveButton = !isInactive
    ? {
        callToAction: t.navigation.reserve,
        href: "#book",
      }
    : {};

  const teaserButton = videoId
    ? {
        callToAction: t.game.watch_teaser,
        href: "#teaser",
        variant: "primary-outline",
      }
    : {};

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
        <div
          className="rounded-2xl border border-secondary-500 bg-white p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:divide-x divide-secondary-500 bg-cover shadow-xl"
          style={{ backgroundImage: `url('${CompanyData.heroBg}')` }}
        >
          {features.map(({ title, description, classes, icon }) => (
            <div
              className={`flex items-center justify-center ${classes}`}
              key={title}
            >
              <Image
                src={icon}
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

      {isInactive && (
        <div className="fixed z-50 bottom-5 right-5 space-y-2">
          <Warning
            title={t.game.inactive.title}
            description={inactiveMessage || t.game.inactive[gameType]}
          />
        </div>
      )}

      <div className={`py-14`}>
        <ContentImage
          title={title}
          subtitle={
            isInactive ? t.game.inactive[gameType] : t.general[gameType]
          }
          description={story}
          buttons={[reserveButton, teaserButton]}
          image={featuredDetailImage}
          order={false}
        />

        <Container classnames="flex md:mt-4 md:justify-center lg:hidden">
          <div className="relative lg:col-span-12 flex order-3 mt-6">
            <div className="flex mr-4">
              <Image
                src="/icon-location.svg"
                alt="pin"
                className="mr-2"
                width={20}
                height={20}
              />
              <Text classnames="text-secondary-500">
                {t.general[gameLocation]}
              </Text>
            </div>
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
          </div>
        </Container>
      </div>

      <AwardSlider
        title={`${t.general.the} "${title}" ${t.topbar.awards}`}
        backgroundColor="darkGray"
        awards={awards}
        locale={locale}
        detail
        t={t.game}
      />

      <Video
        title={`Teaser: ${title}`}
        videoId={videoId}
        videoPlayer={videoPlayer}
        backgroundColor={"lightGray"}
        halfBg={true}
        id={"teaser"}
      />

      {!isInactive && <Prices title="Tarieven" prices={prices} t={t.rate} />}
      {!isInactive && <Bookeo variant={categories[0]} />}

      <Faq title={`FAQ: ${title}`} backgroundColor="lightGray" faq={faq} />
    </>
  );
}
