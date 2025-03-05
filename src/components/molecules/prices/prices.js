"use client";

import React from "react";
import { Container, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

export const Prices = ({ title, description, prices, image, t }) => {
  return (
    <section className={`pb-10 md:py-24 `}>
      <Container classnames="">
        <Title title={title} description={description} />
        <div className="rounded-xl p-2 mt-4 md:mt-12 grid lg:grid-cols-5">
          <div className="lg:col-span-3 ">
            {prices.map(({ price, players }) => (
              <div key={players} className="flex relative  z-20">
                <Text level="p" classnames="text-secondary-500 mr-8 mb-2">
                  <Text as="span" classnames="font-bold">
                    {players}&nbsp;
                  </Text>
                  {t.players}
                </Text>

                <Text level="p" classnames="text-secondary-500 mr-8">
                  <Text as="span" classnames="font-bold">
                    {formatPrice(price)}&nbsp;
                  </Text>
                  {t.escape}
                </Text>

                <Text level="p" classnames="text-secondary-500">
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
