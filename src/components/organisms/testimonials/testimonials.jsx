"use client";

import { clsx } from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { Container, RichText, Text } from "@/components/atoms";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { TestimonialCard } from "@/components/organisms/testimonials/testimonial";

export function Testimonials({ title, description, backgroundColor }) {
  let scrollRef = useRef(null);
  let { scrollX } = useScroll({ container: scrollRef });
  let [setReferenceWindowRef, bounds] = useMeasure();
  let [activeIndex, setActiveIndex] = useState(0);
  let [cards, setCards] = useState(undefined);

  const bgColor = getBackgroundColor(backgroundColor);

  useEffect(() => {
    fetchData(roomsQuery({})).then(({ rooms }) => setCards(rooms));
  }, []);

  useMotionValueEvent(scrollX, "change", (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current.children[0].clientWidth));
  });

  function scrollTo(index) {
    let gap = 32;
    let width = scrollRef.current.children[0].offsetWidth;
    scrollRef.current.scrollTo({ left: (width + gap) * index });
  }

  return (
    <div className={`overflow-hidden py-32 ${bgColor}`}>
      <Container classnames="mb-24">
        <div
          className="md:max-w-[60%] lg:max-w-[40%]"
          ref={setReferenceWindowRef}
        >
          <Image
            src="/artwork-diamond.png"
            alt="diamond artwork"
            className="mb-2"
            width={45}
            height={45}
          />
          {title && (
            <Text as="h5" level="3xl" classnames="text-secondary-500">
              {title}
            </Text>
          )}
          {description && (
            <RichText text={description} classnames="text-primary-700" />
          )}
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          "mt-16 flex gap-8 px-[var(--scroll-padding)]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth",
          "[--scroll-padding:max(theme(spacing.6),calc((100vw-theme(maxWidth.2xl))/2))] lg:[--scroll-padding:max(theme(spacing.8),calc((100vw-theme(maxWidth.7xl))/2))]",
        ])}
      >
        {cards?.map((testimonial, testimonialIndex) => (
          <TestimonialCard
            key={testimonialIndex}
            index={testimonialIndex}
            {...testimonial}
            bounds={bounds}
            scrollX={scrollX}
            locale={document.documentElement.lang}
            onClick={() => scrollTo(testimonialIndex)}
          />
        ))}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
    </div>
  );
}
