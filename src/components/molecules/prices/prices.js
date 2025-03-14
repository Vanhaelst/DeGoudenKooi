"use client";

import React, { useEffect, useRef } from "react";
import { Container, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Prices = ({ title, description, prices, image, t }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.25,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <section className={`pb-10 md:py-24 `}>
      <Container classnames="">
        <Title title={title} description={description} />
        <div
          className="rounded-xl p-2 mt-4 md:mt-12 grid lg:grid-cols-5"
          ref={elementRef}
        >
          <div className="lg:col-span-3 ">
            {prices.map(({ price, players }) => (
              <div key={players} className="flex relative  z-20">
                <Text
                  as="p"
                  level="lg"
                  classnames="text-secondary-500 mr-8 mb-2 font-light"
                >
                  <Text as="span" classnames="font-bold">
                    {players}&nbsp;
                  </Text>
                  {t.players}
                </Text>

                <Text
                  as="p"
                  level="lg"
                  classnames="text-secondary-500 mr-8 font-light"
                >
                  <Text as="span" classnames="font-bold">
                    {formatPrice(price)}&nbsp;
                  </Text>
                  {t.escape}
                </Text>

                <Text
                  as="p"
                  level="lg"
                  classnames="text-secondary-500 font-light"
                >
                  <Text as="span" classnames="font-bold">
                    {formatPrice(price / players)}&nbsp;
                  </Text>
                  {t.person}
                </Text>
              </div>
            ))}
          </div>
          {image && (
            <div className="relative p-6 lg:col-span-2 w-full md:-mt-16 lg:-mt-24 z-10">
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
