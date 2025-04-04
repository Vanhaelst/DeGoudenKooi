"use client";

import React, { useEffect, useRef } from "react";

import { Container } from "@/components/atoms";
import { ReviewCard } from "@/components/molecules/reviews/review-card-small";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { HeroContent } from "@/components/molecules/hero/content";
import { Images } from "@/components/molecules/image/image";

import gsap from "gsap";
import { fade, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
gsap.registerPlugin(ScrollTrigger);

export const Hero = ({
  awards,
  title,
  subtitle,
  description,
  buttons,
  image,
  textColor,
  backgroundImage,
  type,
  backgroundColor,
  videoId,
  videoPlayer = "youtube",
  features,
  detail,
  gameType,
}) => {
  const bgColor = getBackgroundColor(backgroundColor);

  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(wrapperRef.current, fade.from, {
      ...fade.to,
      scrollTrigger: {
        trigger: wrapperRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  if (type === "video") {
    return (
      <section className="hero relative flex h-[80vh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="video-wrapper">
          {videoPlayer === "vimeo" && (
            <iframe
              src={`https://player.vimeo.com/video/${videoId}?h=ab6adab836&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&autopause=0&background=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="video"
              title="Intro video"
            />
          )}
          {videoPlayer === "youtube" && (
            <iframe
              width="568"
              height="319"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1`}
              title="Het geheim van Sint-Rumoldus (trailer) (De Gouden Kooi - Escape experience)"
              frameBorder="0"
              className="video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <Container classnames="py-20">
          <HeroContent
            textColor={textColor}
            title={title}
            description={description}
            buttons={buttons}
            gameType={gameType}
          />
        </Container>
      </section>
    );
  }

  if (type === "vertical") {
    return (
      <section
        className={clsx(bgColor, "pb-40", "bg-cover bg-bottom pt-[150px]")}
        style={{ backgroundImage: `url('${backgroundImage?.[0]?.url}')` }}
      >
        <Container classnames="py-20">
          <HeroContent
            textColor={textColor}
            title={title}
            description={description}
            buttons={buttons}
            gameType={gameType}
          />
          <Images images={image} />
        </Container>
      </section>
    );
  }

  return (
    <section
      className={clsx(bgColor, "bg-cover bg-bottom opacity-0 min-h-[750px]")}
      style={{
        backgroundImage: `url('${backgroundImage?.[0]?.url}')`,
      }}
      ref={wrapperRef}
    >
      <Container classnames="py-20 grid grid-cols-1 lg:grid-cols-2">
        {image && image[0] && (
          <div
            className={`${detail ? "block lg:hidden" : "hidden"} md:max-w-[80%] md:mx-auto mb-4 w-full min-h-40 lg:min-h-96`}
          >
            <Images images={image} />
          </div>
        )}

        <HeroContent
          textColor={textColor}
          detail={detail}
          title={title?.toUpperCase()}
          subtitle={subtitle}
          description={description}
          buttons={buttons}
          features={features}
          awards={awards}
          gameType={gameType}
        />

        {image && image[0] && (
          <div
            className={`${detail ? "hidden lg:block" : "hidden lg:block"} md:max-w-[80%] md:mx-auto mb-4 w-full min-h-40 lg:min-h-96`}
          >
            <Images images={image} />
          </div>
        )}
      </Container>
    </section>
  );
};
