"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Feature = ({ title, description, icon, index }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: (index % 3) * 0.5,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <div ref={elementRef}>
      <div className="relative flex flex-row items-center">
        <Image
          src={icon?.url || "/artwork-diamond.png"}
          alt={icon?.alt || "diamond artwork"}
          className="w-10 h-10 mr-2"
          width={icon?.width || 45}
          height={icon?.height || 45}
        />
        {title && (
          <Text as="h5" level="xl" classnames="text-secondary-500">
            {title}
          </Text>
        )}
      </div>
      {description && (
        <RichText text={description} classnames="text-primary-700" />
      )}
    </div>
  );
};
