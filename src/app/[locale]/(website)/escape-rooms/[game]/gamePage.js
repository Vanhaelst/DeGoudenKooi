"use client";

import React, { useEffect, useState } from "react";

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
import { Reviews } from "@/components/organisms/reviews/review";
import { useParams } from "next/navigation";
import { Container } from "@/components/atoms";
import { Feature, Title } from "@/components/molecules";
import { Usp } from "@/components/molecules/usp";
import { clsx } from "clsx";

export default function GamePage({ data, children }) {
  const { locale } = useParams();
  const [faq, setFaq] = useState(undefined);
  const [sliderAwards, setSliderAwards] = useState(undefined);
  const [heroAwards, setHeroAwards] = useState(undefined);
  const [isLoading, setIsLoading] = useState(window.location.hash === "#book");
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
    uspHeading,
    uspDescription,
    usps,
    reviews,
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
    fetchData(faqQuery({ language: locale, categories })).then((res) => {
      setFaq(res.faq);
    });

    fetchData(`query MyQuery {
        sliderAwards: awardsEntries(categories: ["${categories}"], visibility: ["roomsSlider"]) {
            ...on award_Entry {
            title
            description
            image: awardimage ${imageQuery}
            visibility
            categories
            }
          } 
        heroAwards: awardsEntries(categories: ["${categories}"], visibility: ["roomsHero"]) {
            ...on award_Entry {
            title
            description
            image: awardimage ${imageQuery}
            visibility
            categories
            }
        }                 
  }  `).then((res) => {
      setSliderAwards(res.sliderAwards);
      setHeroAwards(res.heroAwards);
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
      tooltip: t.game.minAge,
    },
    {
      icon: "/icon-coins.svg",
      description: `${t.general.from} ${formatPrice(price6 / 6)} p.p.`,
      classes: "",
    },
  ];

  const reserveButton = !isInactive
    ? {
        callToAction: t.navigation.reserve,
        href: "#book",
      }
    : {};

  useEffect(() => {}, []);

  useEffect(() => {
    if (data && window.location.hash === "#book") {
      document.body.classList.add("stop-scrolling");
      setTimeout(() => {
        setIsLoading(false);
        document.body.classList.remove("stop-scrolling");
        setTimeout(() => {
          document
            .getElementById("book")
            .scrollIntoView({ behavior: "smooth" });
        }, 250);
      }, 1000);
    }
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      {isLoading ? <Loader /> : null}

      <main
        className={clsx(
          isLoading ? "opacity-0 h-[300vh] overflow-hidden" : "opacity-100",
          "transition-all duration-1000",
          "bg-[length:100%_100%] bg-center",
        )}
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
          gameType={t.general[gameType]}
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

          {usps?.length > 0 ? (
            <section className={`py-12 sm:py-16`}>
              <Container classnames="mb-24">
                <Title
                  title={uspHeading}
                  description={uspDescription}
                  center={true}
                />
              </Container>
              <Container classnames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {usps?.map((usp, index) => {
                  return <Usp key={usp.title} {...usp} index={index} />;
                })}
              </Container>
            </section>
          ) : null}

          {sliderAwards && sliderAwards.length ? (
            <AwardSlider
              title={`${t.general.the} "${title}" ${t.topbar.awards}`}
              backgroundColor="darkGray"
              awards={sliderAwards}
              locale={locale}
              slider
              t={t.game}
            />
          ) : null}
          <Reviews reviews={reviews} />
          {!isInactive && (
            <Prices
              prices={prices}
              image={priceImage[0]}
              t={t.rate}
              gameType={gameType}
            />
          )}
          {!isInactive && (
            <Bookeo
              locale={locale}
              variant={categories[0]}
              title={`${t.navigation.reserve} ${title}`}
            />
          )}
          <div id="faq" className="mb-10 md:mb-20" />
          <Faq
            title={`${t.game.faq} ${title}`}
            backgroundColor="lightGray"
            faq={faq}
          />
          {children}
        </div>
      </main>
    </>
  );
}
