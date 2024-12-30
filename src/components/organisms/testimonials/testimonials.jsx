"use client";

import { clsx } from "clsx";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useMeasure from "react-use-measure";
import { Container, RichText, Text } from "@/components/atoms";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

function TestimonialCard({
  title,
  time,
  players,
  featuredImage,
  gameLocation,
  gameType,
  children,
  bounds,
  scrollX,
  ...props
}) {
  let ref = useRef(null);

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

  return (
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
          className="inset-x-0 top-0 aspect-[37/40] w-full object-cover rounded-3xl"
        />
      </div>

      <figure className="relative py-5 h-full">
        <figcaption className="mt-6 h-full flex flex-col justify-between">
          <Text as="h4" level="xl" classnames="text-secondary-500">
            {title}
          </Text>
          <Text as="p" level="sm" classnames="text-secondary-500">
            {gameType} {/* TODO: map to clean translatable text */}
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
  );
}

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
            {...testimonial}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => scrollTo(testimonialIndex)}
          />
        ))}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
    </div>
  );
}
