"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

const defaultSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 9000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  slidesToShow: 8,
};

export const LogoSlider = ({ slides, settings = {} }) => {
  const sliderSettings = {
    ...defaultSettings,
    ...settings,
  };
  return (
    <Slider {...sliderSettings}>
      {slides.map(({ alt, url, width, height }) => (
        <div key={url} className="px-9">
          <Image
            src={url}
            alt={alt}
            width={width}
            height={height}
            className="w-36 h-36 object-contain"
          />
        </div>
      ))}
    </Slider>
  );
};
