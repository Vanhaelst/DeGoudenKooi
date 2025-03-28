"use client";

import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { fade, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
gsap.registerPlugin(ScrollTrigger);

export const Badge = ({ title, slug, featuredImage, index }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fade.from, {
      ...fade.to,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, [index]);

  return (
    <a
      ref={elementRef}
      href={slug}
      className={clsx(
        "opacity-0",
        "w-40 min-w-40 max-w-40",
        "md:w-32 md:min-w-32 md:max-w-32",
        "lg:w-40 lg:min-w-40 lg:max-w-40",
        "group mx-auto flex flex-col items-center hover:grayscale-0 duration-200 hover:opacity-100",
      )}
    >
      <img
        src={featuredImage[0].url}
        alt={title || ""}
        className="px-2 lg:px-4 mb-2 perspective object-contain hover:scale-105 transition-all duration-500"
      />
    </a>
  );
};
