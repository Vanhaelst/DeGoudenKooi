"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

const settings = {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
  infinite: true,
  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 1000,
};

export const Images = ({ images, classnames }) => {
  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    const image = images?.[0];
    const classes = image.url.includes(".png")
      ? "object-contain"
      : "rounded-2xl object-cover ";

    return (
      <div className={`${classnames} h-full flex flex-col justify-center`}>
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={`${classes} float w-full`}
        />
      </div>
    );
  }

  return (
    <div
      className="slider-container"
      style={{ transform: "translate(0%, 25%)" }}
    >
      <Slider {...settings}>
        {images.map((image) => {
          const classNames = image.url.includes(".png")
            ? "object-contain"
            : "rounded-2xl object-cover ";

          return (
            <Image
              key={image.url}
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className={`${classNames} float w-full`}
            />
          );
        })}
      </Slider>
    </div>
  );
};
