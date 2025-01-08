"use client";

import React, { useEffect, useRef } from "react";
import { Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "@/components/molecules/image/image";
gsap.registerPlugin(ScrollTrigger);

export const TeamMember = ({ name, image, role, position, index }) => {
  const foo = image?.[0];

  const wrapperRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(wrapperRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: (index % 3) * 0.5 + 1,
      scrollTrigger: {
        trigger: wrapperRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <li
      key={name}
      className="list-none flex flex-col items-center space-y-5 opacity-0"
      ref={wrapperRef}
    >
      <div className="w-40" ref={descriptionRef}>
        <Images images={image} ref={descriptionRef} animation={false} />
      </div>
      <div className="flex flex-col items-center">
        <div ref={titleRef}>
          <Text as="h4" level="lg" classnames="text-primary-500">
            {name}
          </Text>
        </div>
        <div ref={descriptionRef}>
          <Text
            as="p"
            level="sm"
            classnames="text-secondary-500/50 mb-3 text-center"
          >
            {role}
          </Text>
        </div>
        <div ref={buttonRef}>
          <Text as="p" level="sm" classnames="text-secondary-500">
            {position}
          </Text>
        </div>
      </div>
    </li>
  );
};
