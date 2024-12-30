"use client";

import React, { useState } from "react";
import { Button, Container, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { CheckBadgeIcon, TagIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "@/utils/formatPrice";

export const Prices = ({ title, description, prices }) => {
  const [value, setValue] = useState("2");
  const bgColor = "bg-lightGray-500";

  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="">
        <Title title={title} description={description} />
        <div className="bg-white rounded-xl p-2 mt-12 grid lg:grid-cols-5">
          <div className="bg-white rounded-xl p-6 lg:col-span-3">
            <Text level="p" classnames="mb-2">
              What&apos;s included
            </Text>

            {prices.map(({ price, players }) => (
              <div key={players} className="flex mb-2">
                <CheckBadgeIcon className="w-6 h-6 mr-2" />
                <Text level="p" classnames="text-secondary-500">
                  <Text as="span" classnames="font-bold">
                    {players} spelers:&nbsp;
                  </Text>
                  {formatPrice(price)} per escape experience /{" "}
                  {formatPrice(price / players)}{" "}
                  <span className="inline xl:hidden">p.p.</span>
                  <span className="hidden xl:inline">per persoon</span>
                </Text>
              </div>
            ))}
          </div>
          <div className="p-6 lg:col-span-2 bg-lightGray-500 w-full">
            <div className="flex justify-between">
              <TagIcon className="w-6 h-6 mr-2" />
              <Text
                as="span"
                level="sm"
                classnames="shadow-md border-solid border-2 border-white font-light py-1 px-2 rounded-lg text-white bg-primary-500"
              >
                Speel met meer, betaal minder
              </Text>
            </div>
            <Text level="2xl" as="span" classnames="font-bold">
              Totaal
            </Text>
            <Text level="lg" as="p" classnames="font-light text-primary-700">
              {value} spelers
            </Text>
            <Text level="2xl" as="span" classnames="font-bold">
              {formatPrice(prices[value - 2].price / prices[value - 2].players)}{" "}
              <Text
                level="md"
                as="span"
                classnames="font-light text-primary-700"
              >
                /per persoon
              </Text>
            </Text>

            <div className="my-4">
              <Button
                href="#"
                variant="primary"
                classnames="w-full"
                size="small"
                callToAction="Boek nu"
              />
            </div>

            <input
              type="range"
              min={2}
              max={6}
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
              className="range range-xs [--range-shdw:#CBA442]"
              step={1}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
