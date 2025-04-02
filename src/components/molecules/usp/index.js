"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Usp = ({ title, description, icon, index }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: index * 0.15,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, [index]);

  return (
    <div ref={elementRef} className="relative flex flex-col items-center mb-2">
      <Image
        src={icon?.[0]?.url || "/artwork-diamond.png"}
        alt={icon?.[0]?.alt || "diamond artwork"}
        className="w-32 h-32 mb-6"
        width={icon?.[0]?.width || 45}
        height={icon?.[0]?.height || 45}
      />
      {title && (
        <Text
          as="h3"
          level="xl"
          classnames="text-secondary-500 font-bold text-center"
        >
          {title}
        </Text>
      )}
      {description && (
        <RichText
          text={description}
          classnames="text-primary-700 text-center"
          font-light
        />
      )}
    </div>
  );
};
