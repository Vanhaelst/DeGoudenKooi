import { Button, Container, RichText, Text } from "@/components/atoms";
import { ReviewCard } from "@/components/molecules/reviews/review-card-small";
import { Slider } from "@/components/molecules";
import Image from "next/image";
import React from "react";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { HeroContent } from "@/components/molecules/hero/content";

const settings = {
  slidesToShow: 8,
  slidesToScroll: 1,
  speed: 9000,
  autoplaySpeed: 0,
  autoplay: true,
  infinite: true,
  arrows: false,
  pauseOnHover: false,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export const HeroAwards = ({ awards, showAwards }) => {
  if (awards?.length === 0 || !showAwards) {
    return null;
  }

  return (
    <Container classnames="py-10 xl:py-20">
      <Slider settings={settings}>
        {awards?.map(({ image }) => {
          const { alt, url, width, height } = image?.[0];
          return (
            <div key={url} className="px-9">
              <Image
                src={url}
                alt={alt || ""}
                width={width}
                height={height}
                className="w-24 lg:w-36 lg:h-36 object-contain"
              />
            </div>
          );
        })}
      </Slider>
    </Container>
  );
};
