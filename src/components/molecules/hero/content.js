"use client";

import React, { useEffect, useRef } from "react";
import { Button, RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export const HeroContent = ({
  awards,
  title,
  subtitle,
  description,
  buttons,
  features,
  detail = false,
}) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const awardsRef = useRef(null);
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

    gsap.fromTo(featuresRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 2,
      scrollTrigger: {
        trigger: featuresRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(awardsRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 2.5,
      scrollTrigger: {
        trigger: awardsRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(buttonRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 3,
      scrollTrigger: {
        trigger: buttonRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <div className="flex justify-center flex-col">
      <div ref={titleRef} className="pb-8">
        <Text
          as={"h1"}
          level="4xl"
          classnames={`${detail ? "text-white" : "text-secondary-500"} text-center lg:text-left font-black`}
        >
          {title}
        </Text>
        <Text
          as={"h3"}
          level="2xl"
          classnames={`${detail ? "text-white" : "text-secondary-500"} text-center lg:text-left italic `}
        >
          {subtitle}
        </Text>
      </div>
      {description && (
        <div ref={descriptionRef}>
          <RichText
            text={description}
            classnames="text-primary-700 font-light"
          />
        </div>
      )}
      {features && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-y-4"
          ref={featuresRef}
        >
          {features.map(({ title, description, classes, icon }) => (
            <div
              className={`flex items-center justify-center lg:justify-start ${classes}`}
              key={title}
            >
              <Image
                src={icon}
                alt={description}
                className="mr-3 w-10 h-10"
                width={13}
                height={16}
              />
              <div className="flex flex-col">
                <Text
                  as={"span"}
                  level="sm"
                  classnames="font-semibold text-white"
                >
                  {description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="flex items-center justify-center lg:justify-start space-x-4 my-6"
        ref={awardsRef}
      >
        {awards?.map(({ title, image }) => (
          <Image
            key={image[0].url}
            src={image[0].url}
            alt={title}
            className="w-32 h-32 object-contain brightness-0 invert"
            width={image[0].width}
            height={image[0].height}
          />
        ))}
      </div>

      <div className="mx-auto lg:mx-0 space-x-4 mt-6" ref={buttonRef}>
        {buttons?.map(({ href, variant, callToAction }) => {
          return (
            <Button
              key={href}
              variant={variant}
              href={href}
              callToAction={callToAction.toUpperCase()}
            />
          );
        })}
      </div>
    </div>
  );
};
