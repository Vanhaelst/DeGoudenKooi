"use client";

import { Button, RichText, Text } from "@/components/atoms";
import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export const Cta = ({
  title,
  description,
  buttons,
  backgroundImage,
  pullUp,
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.5,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

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
        <div className="space-x-2 mt-6">
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
