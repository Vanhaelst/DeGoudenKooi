"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";

import gsap from "gsap";
import { fade, fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

export const Images = ({ images, classnames, animation = "true" }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 1,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    const image = images?.[0];
    const classes = image.url.includes(".png")
      ? "object-contain"
      : "rounded-2xl object-cover ";

    return (
      <div
        className={`${classnames} h-full flex flex-col justify-center`}
        ref={elementRef}
      >
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={`${classes} ${animation ? "float" : ""} mx-auto max-w-[80%] md:max-w-full w-full`}
        />
      </div>
    );
  }

  return (
    <div className={`${classnames} slider-container`} ref={elementRef}>
      <Slider {...settings}>
        {images.map((image) => {
          const classNames = image.url.includes(".png")
            ? "object-contain py-10"
            : "rounded-2xl object-cover py-10";

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
