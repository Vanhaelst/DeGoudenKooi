"use client";

import nl from "@/app/[locale]/dictionaries/nl.json";
import en from "@/app/[locale]/dictionaries/en.json";

import { motion, useMotionValueEvent, useSpring } from "framer-motion";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function TestimonialCard({
  title,
  time,
  players,
  featuredImage,
  gameLocation,
  gameType,
  children,
  slug,
  bounds,
  locale,
  scrollX,
  index,
  ...props
}) {
  let ref = useRef(null);
  const elementRef = useRef(null);

  let computeOpacity = useCallback(() => {
    let element = ref.current;
    if (!element || bounds.width === 0) return 1;

    let rect = element.getBoundingClientRect();

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left;
      let percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right;
      let percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else {
      return 1;
    }
  }, [ref, bounds.width, bounds.left, bounds.right]);

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  });

  useLayoutEffect(() => {
    opacity.set(computeOpacity());
  }, [computeOpacity, opacity]);

  useMotionValueEvent(scrollX, "change", () => {
    opacity.set(computeOpacity());
  });

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: index * 0.5,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <a href={`/nl/${slug}`} ref={elementRef}>
      <motion.div
        ref={ref}
        style={{ opacity }}
        {...props}
        className="relative flex w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-between overflow-hidden sm:w-96"
      >
        <div>
          <img
            alt=""
            src={featuredImage?.[0]?.url}
            className="top-0 aspect-[37/40] w-full object-contain object-left rounded-3xl"
          />
        </div>

        <figure className="relative py-5 h-full">
          <figcaption className="mt-6 h-full flex flex-col justify-between">
            <Text as="h4" level="xl" classnames="text-secondary-500">
              {title}
            </Text>
            <Text as="p" level="sm" classnames="text-secondary-500">
              {locale === "nl" ? nl.general[gameType] : en.general[gameType]}
            </Text>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-4">
                <Image
                  src="/icon-hourglass.svg"
                  alt="zandloper"
                  className="mr-2 w-3 h-6"
                  width={13}
                  height={16}
                />
                <Text as="span" level="xs" classnames="text-secondary-500">
                  {time}
                </Text>
              </div>

              <div className="flex items-center">
                <Image
                  src="/icon-group.svg"
                  alt="Aantal spelers"
                  className="mr-2 w-6 h-6"
                  width={21}
                  height={14}
                />
                <Text as="span" level="xs" classnames="text-secondary-500">
                  {players}
                </Text>
              </div>
            </div>
          </figcaption>
        </figure>
      </motion.div>
    </a>
  );
}
