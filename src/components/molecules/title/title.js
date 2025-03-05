"use client";

import { useEffect, useRef } from "react";
import { RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Title = ({ title, subtitle, description, classnames }) => {
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

  if (!title && !description) {
    return null;
  }

  return (
    <div ref={elementRef} className={classnames}>
      {title && (
        <Text
          as="h5"
          level="3xl"
          classnames="text-secondary-500 mb-4 font-bold"
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text as="h6" level="xl" classnames="text-secondary-500 mb-4 font-bold">
          {subtitle}
        </Text>
      )}
      {description && (
        <RichText text={description} classnames="text-primary-700 font-light" />
      )}
    </div>
  );
};
