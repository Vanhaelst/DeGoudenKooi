import { Button, Container, RichText, Text } from "@/components/atoms";
import { ReviewCard } from "@/components/molecules/reviews/review-card-small";
import { Slider } from "@/components/molecules";
import Image from "next/image";
import React from "react";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

export const HeroContent = ({ title, description, buttons }) => {
  return (
    <div className="flex justify-center flex-col">
      <Text as={"h1"} level="4xl" classnames="text-secondary-500">
        {title}
      </Text>
      {description && (
        <RichText text={description} classnames="text-primary-700" />
      )}
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
  );
};
