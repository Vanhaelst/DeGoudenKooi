"use client";

import React, { useEffect, useRef } from "react";
import { Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Badge = ({
  title,
  slug,
  featuredImage,
  gameLocation,
  dict,
  searchParams,
  gameType,
  length,
  index,
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: index * 0.25,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, [index]);

  return (
    <a
      ref={elementRef}
      href={slug}
      className={`group ${length ? "w-36 min-w-36 md:w-48 md:min-w-48 lg:w-[calc(100%/7)] lg:min-w-[calc(100%/7)" : "w-48 min-w-48"} flex flex-col items-center hover:grayscale-0 duration-200 hover:opacity-100 ${gameLocation === searchParams.location ? "lg:opacity-75" : "lg:opacity-75"}`}
    >
      <img
        src={featuredImage[0].url}
        alt={title || ""}
        className="px-2 lg:px-4 mb-2 perspective object-contain"
      />
      {/*}
      <Text
        as="span"
        level="sm"
        classnames="text-center transition-all group-hover:font-bold group-hover:scale-110 font-light lg:text-gray-700 group-hover:text-primary-500"
      >
        {dict.general[gameType]}
      </Text>
      <Text
        as="span"
        level="sm"
        classnames="text-center transition-all group-hover:font-bold group-hover:scale-110 group-hover:text-primary-500"
      >
        {title}
      </Text>*/}
    </a>
  );
};
