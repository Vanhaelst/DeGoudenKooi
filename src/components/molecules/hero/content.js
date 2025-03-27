"use client";

import React, { useEffect, useRef } from "react";
import { Button, RichText, Text } from "@/components/atoms";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

export const HeroContent = ({
  awards,
  title,
  subtitle,
  description,
  buttons,
  features,
  textColor,
  detail = false,
  gameType,
}) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const awardsRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.25,
      scrollTrigger: {
        trigger: titleRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(descriptionRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.5,
      scrollTrigger: {
        trigger: descriptionRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(featuresRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.75,
      scrollTrigger: {
        trigger: featuresRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(awardsRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 1,
      scrollTrigger: {
        trigger: awardsRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(buttonRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 1.25,
      scrollTrigger: {
        trigger: buttonRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  const getColor = () => {
    switch (textColor) {
      case "white":
        return "text-white";
      case "primary":
        return "text-primary-500";
      default:
        return "text-secondary-500";
    }
  };
  return (
    <div className="flex justify-center flex-col">
      <div ref={titleRef} className="pb-8">
        <Text
          as={"h1"}
          level="4xl"
          classnames={`${detail ? "text-white" : getColor()} text-center lg:text-left font-black`}
        >
          {title}
        </Text>
        <Text
          as={"h3"}
          level="2xl"
          classnames={`${detail ? "text-white" : getColor()} text-center lg:text-left italic `}
        >
          {subtitle}
        </Text>
        {gameType ? (
          <Text as={"span"} level="sm" classnames="font-semibold text-white">
            {gameType}
          </Text>
        ) : null}
      </div>
      {description && (
        <div ref={descriptionRef}>
          <RichText
            text={description}
            level="lg"
            classnames={`${detail ? "text-primary-700" : getColor()}  font-light`}
          />
        </div>
      )}
      {features && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-y-4"
          ref={featuresRef}
        >
          {features.map(({ title, description, classes, icon, tooltip }) => {
            if (tooltip) {
              return (
                <div
                  className={`flex items-center justify-center lg:justify-start ${classes}`}
                  key={title}
                >
                  <Image
                    src={icon}
                    alt={description || ""}
                    className="mr-3 w-10 h-10"
                    width={13}
                    height={16}
                  />
                  <div className="flex flex-row">
                    <Text
                      as={"span"}
                      level="sm"
                      classnames="font-semibold text-white"
                    >
                      {description}
                    </Text>
                    <Link
                      href="#faq"
                      className="hover:cursor-pointer tooltip"
                      data-tip={tooltip}
                    >
                      <InformationCircleIcon className="ml-2 size-5 text-white" />
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div
                className={`flex items-center justify-center lg:justify-start ${classes}`}
                key={title}
              >
                <Image
                  src={icon}
                  alt={description || ""}
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
            );
          })}
        </div>
      )}

      <div
        className="flex items-center justify-center lg:justify-start space-x-4 my-6"
        ref={awardsRef}
      >
        {awards &&
          awards.map(({ title, image }) => (
            <Image
              key={image[0]?.url}
              src={image[0]?.url}
              alt={title || ""}
              className="w-32 h-32 object-contain brightness-0 invert"
              width={image[0]?.width}
              height={image[0]?.height}
            />
          ))}
      </div>

      <div
        className="mx-auto lg:mx-0 space-y-4 md:space-x-4 mt-6"
        ref={buttonRef}
      >
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
