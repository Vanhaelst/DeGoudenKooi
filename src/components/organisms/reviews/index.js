"use client";

import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { RichText, Text } from "@/components/atoms";

export const Review = ({ title, description, index = 1 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.25 + index * 0.25,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <div className="mx-5" ref={elementRef}>
      <RichText
        text={description}
        as="p"
        classnames="text-secondary-700 text-center text-bold w-full"
      />

      <Text as="h5" classnames="text-primary-700 text-center mt-4">
        {title}
      </Text>
    </div>
  );
};
