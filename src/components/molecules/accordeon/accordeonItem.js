"use client";

import React, { useEffect, useRef } from "react";
import { RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const AccordionItem = ({ title, description }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.25,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <div className="collapse collapse-plus" ref={elementRef}>
      <input type="checkbox" name="my-accordion-3" />
      <div className="collapse-title px-0 pr-20">
        <Text as="p" level="lg" classnames="font-semibold text-primary-700">
          {title}
        </Text>
      </div>
      <div className="collapse-content px-0">
        <RichText
          text={description}
          level="md"
          classnames="text-primary-700 font-light"
        />
      </div>
    </div>
  );
};
