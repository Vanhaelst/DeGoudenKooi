"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Container, RichText, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { LINKS } from "@/enums/links";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slider from "react-slick";
import { clsx } from "clsx";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const settings = {
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const AwardSlider = ({
  title,
  description,
  backgroundColor,
  backgroundImage,
  awards,
  detail,
  slider,
  locale = "nl",
  t,
}) => {
  const elementRef = useRef(null);

  if (!awards || awards.length === 0) {
    return null;
  }

  if (slider) {
    return (
      <section
        className={`py-12 px-8 md:px-4 bg-cover bg-center`}
        style={{ backgroundImage: `url('${backgroundImage?.[0]?.url}')` }}
      >
        <Container classnames="flex flex-col items-center">
          {title && (
            <Text
              as="h5"
              level="2xl"
              classnames={clsx(
                "text-primary-500 font-bold",
                "text-center mt-5",
                description ? "mb-4" : "",
              )}
            >
              {title}
            </Text>
          )}
          {description && (
            <RichText
              text={description}
              level="lg"
              classnames={clsx("text-primary-700 font-light", "text-center")}
            />
          )}
        </Container>

        <Container classnames="relative">
          <Slider {...settings}>
            {awards.map(({ title, image }) => {
              if (!image[0]) {
                return null;
              }
              return (
                <Link key={image[0].url} href={LINKS.NL.AWARDS}>
                  <Image
                    src={image[0].url}
                    alt={image[0].alt || title || ""}
                    width={image[0].width}
                    height={image[0].height}
                    className="w-full px-6 h-32 object-contain"
                  />
                </Link>
              );
            })}
          </Slider>
        </Container>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16`}>
      <Container classnames="pb-12 flex flex-col items-center">
        <Title title={title} description={description} />
      </Container>

      <Container classnames="relative">
        <div
          ref={elementRef}
          className={`grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 rounded-2xl md:grid-cols-3 ${backgroundColor === "white" ? "bg-primary-500/10" : "bg-white/75"}`}
        >
          {awards?.map(({ image, title }) => {
            const { alt, url, width, height } = image?.[0];
            return (
              <a
                href={LINKS[locale.toUpperCase()].AWARDS}
                key={url}
                className={`${backgroundColor === "white" ? "bg-primary-500/10" : "bg-white/75"} relative group p-8 sm:p-10 flex flex-col justify-center items-center h-30 transition-all overflow-hidden`}
              >
                <Image
                  src={url}
                  alt={alt || ""}
                  width={width}
                  height={height}
                  className="h-20 w-full object-contain transition-all pb-2"
                />
                <Text
                  as="h1"
                  level="lg"
                  classnames="absolute -bottom-5 text-center opacity-0 group-hover:bottom-2 group-hover:opacity-100 transition-all duration-300"
                >
                  {title}
                </Text>
              </a>
            );
          })}
        </div>

        {detail && (
          <div className="mt-16 flex justify-center">
            <p className="relative rounded-full bg-primary-500 px-4 py-1.5 text-sm/6 text-white hover:shadow-xl mb-2">
              <span className="hidden md:inline mr-1">{t.awards_link}</span>
              <a
                href={LINKS[locale.toUpperCase()].AWARDS}
                className="font-semibold text-white"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {t.awards_link_bold}
                <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span>
              </a>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};
