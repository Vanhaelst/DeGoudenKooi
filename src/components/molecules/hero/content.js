"use client";

import React, { useEffect, useRef } from "react";
import { Button, RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const HeroContent = ({ title, description, buttons, ref }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(descriptionRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 1.5,
      scrollTrigger: {
        trigger: descriptionRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(buttonRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 2,
      scrollTrigger: {
        trigger: buttonRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <div className="flex justify-center flex-col">
      <div ref={titleRef}>
        <Text as={"h1"} level="4xl" classnames="text-secondary-500">
          {title}
        </Text>
      </div>
      {description && (
        <div ref={descriptionRef}>
          <RichText text={description} classnames="text-primary-700" />
        </div>
      )}
      <div className="space-x-2 mt-6" ref={buttonRef}>
        {buttons?.map(({ href, variant, callToAction }) => {
          return (
            <Button
              key={href}
              variant={variant}
              href={href}
              callToAction={callToAction}
            />
          );
        })}
      </div>
    </div>
  );
};
