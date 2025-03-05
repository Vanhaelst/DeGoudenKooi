"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { fetchData } from "@/utils/fetchData";
import { ContentImage } from "@/components/organisms/content/content-image";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import { Prices } from "@/components/molecules/prices/prices";
import { Hero } from "@/components/molecules/hero/hero";
import { Faq } from "@/components/molecules/faq/faq";
import { Loader } from "@/components/atoms/loader/loader";
import { faqQuery } from "@/queries/sections/faq";
import { AwardSlider } from "@/components/molecules/awardSlider/awards";

import nl from "@/app/[locale]/dictionaries/nl.json";
import en from "@/app/[locale]/dictionaries/en.json";
import Warning from "@/components/molecules/alerts/warning";
import { imageQuery } from "@/queries/entries/image";
import { formatPrice } from "@/utils/formatPrice";
import ModalVideo from "@/components/molecules/video/modalVideo";
import { Container, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { Reviews } from "@/components/organisms/reviews/review";

export default function GamePage({ data, locale }) {
  const [faq, setFaq] = useState(undefined);
  const [awards, setAwards] = useState(undefined);
  const t = locale === "nl" ? nl : en;

  const {
    title,
    mainBackground,
    featuredImage,
    heroTitle,
    heroSubTitle,
    contentItem,
    detailImage,
    backgroundImage,
    transparentImage,
    inactiveMessage,
    inactiveFrom,
    inactiveTill,
    videoId,
    videoPlayer,
    videoImage,
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
    priceImage,
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
    },
    {
      icon: "/icon-coins.svg",
      description: `${t.general.from} ${formatPrice(price6 / 6)} p.p.`,
      classes: "",
    },
  ];

  const heroAwards = awards?.filter((award) => award.class === "a");

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

  console.log(contentItem);
  return (
    <main
      className={`bg-[length:100%_100%] bg-center`}
      style={{
        backgroundImage: `url('${mainBackground?.[0]?.url}')`,
      }}
    >
      <Hero
        detail={true}
        type={"horizontal"}
        image={detailImage || featuredImage}
        backgroundImage={backgroundImage}
        title={heroTitle}
        subtitle={heroSubTitle}
        features={features}
        awards={heroAwards}
        buttons={[reserveButton]}
      />

      {isInactive && (
        <div className="fixed z-50 bottom-5 right-5 space-y-2">
          <Warning
            title={t.game.inactive.title}
            description={inactiveMessage || t.game.inactive[gameType]}
          />
        </div>
      )}

      <div
        id="content"
        className={`bg-no-repeat bg-contain bg-top`}
        style={{
          backgroundImage: `url('${transparentImage?.[0]?.url}')`,
        }}
      >
        <div className={`py-14 space-y-8 md:space-x-16`}>
          {contentItem?.map((item) => (
            <ContentImage key={item.id} detail={true} {...item} />
          ))}
        </div>

        <ModalVideo
          videoId={videoId}
          videoPlayer={videoPlayer}
          thumb={videoImage?.[0]}
        />

        <AwardSlider
          title={`${t.general.the} "${title}" ${t.topbar.awards}`}
          backgroundColor="darkGray"
          awards={awards}
          locale={locale}
          slider
          t={t.game}
        />

        <Reviews />

        {!isInactive && (
          <Prices
            title="Tarieven"
            prices={prices}
            image={priceImage[0]}
            t={t.rate}
          />
        )}
        {!isInactive && <Bookeo variant={categories[0]} />}

        <Faq title={`FAQ: ${title}`} backgroundColor="lightGray" faq={faq} />
      </div>
    </main>
  );
}
