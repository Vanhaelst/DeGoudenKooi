"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button, RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Cta = ({
  title,
  description,
  buttons,
  backgroundImage,
  image,
  pullUp,
}) => {
  const elementRef = useRef(null);

  if (image?.[0]) {
    return (
      <div
        className={`bg-primary-500 rounded-3xl bg-no-repeat bg-contain bg-right-bottom grid md:grid-cols-4 ${pullUp ? "relative -top-20" : ""}`}
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
        ref={elementRef}
      >
        <Image
          src="/border-top-right.png"
          alt="border-top-right.png"
          width={92}
          height={92}
          className="absolute w-20 -top-10 -right-10 object-contain"
        />
        <Image
          src={image?.[0]?.url}
          alt={image?.[0]?.alt || title || ""}
          width={image?.[0]?.width}
          height={image?.[0]?.height}
          className="relative mx-auto w-2/3 mt-10 md:w-full md:mt-0 md:-top-10 md:-left-10 object-contain"
        />

        <div className="mx-auto p-8 lg:p-16 md:pl-0 lg:pl-0 md:col-span-3">
          <Text
            as={"h2"}
            level="3xl"
            classnames="text-white lg:max-w-[80%] font-bold"
          >
            {title}
          </Text>
          <RichText text={description} classnames="text-white font-light" />
          <div className="space-x-2 mt-6 mb-10 md:mb-4">
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
      </div>
    );
  }

  return (
    <div
      className={`bg-primary-500 rounded-3xl bg-no-repeat bg-contain bg-right-bottom ${pullUp ? "relative -top-20" : ""}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
      ref={elementRef}
    >
      <div className="mx-auto p-8 lg:p-16">
        <Text
          as={"h2"}
          level="3xl"
          classnames="text-white lg:max-w-[80%] font-bold"
        >
          {title}
        </Text>
        <RichText text={description} classnames="text-white font-light" />
        <div className="space-x-2 mt-6 mb-10 md:mb-4">
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
    </div>
  );
};
