"use client";

import { useEffect, useRef } from "react";
import { Button, RichText, Text } from "@/components/atoms";
import Image from "next/image";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const BentoCard = ({
  title,
  description,
  buttons,
  image,
  isBackgroundAsset,
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

  return (
    <Image
      alt={title || ""}
      src={image?.[0].url}
      width={image?.[0].width}
      height={image?.[0].height}
      className="h-60 lg:h-80 w-full  object-contain"
    />
  );
};
