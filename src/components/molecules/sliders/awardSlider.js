"use client";

import React from "react";
import Slider from "react-slick";

const defaultSettings = {
  dots: true,
  arrows: false,
  draggable: false,
};

export const SlickSlider = ({ children, settings = {} }) => {
  const sliderSettings = {
    ...defaultSettings,
    ...settings,
  };
  return <Slider {...sliderSettings}>{children}</Slider>;
};
