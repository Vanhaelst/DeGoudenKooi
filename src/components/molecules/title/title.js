"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Title = ({
  title,
  subtitle,
  description,
  classnames,
  showIcon = true,
}) => {
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
      {showIcon && (
        <Image
          src="/symbool.png"
          alt="diamond artwork"
          className="mb-2 w-16 h-16"
          width={45}
          height={45}
        />
      )}
      <Text as="h5" level="3xl" classnames="text-secondary-500 mb-4">
        {title}
      </Text>
      <Text as="h6" level="xl" classnames="text-secondary-500 mb-4">
        {subtitle}
      </Text>
      <RichText text={description} classnames="text-primary-700" />
    </div>
  );
};
