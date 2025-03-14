"use client";

import React, { useEffect, useRef } from "react";
import { Button, Container, RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Content = ({ title, description, buttons, columns }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.25,
      scrollTrigger: {
        trigger: titleRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(descriptionRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.5,
      scrollTrigger: {
        trigger: descriptionRef.current,
        ...scrollTrigger,
      },
    });

    gsap.fromTo(buttonRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      delay: 0.75,
      scrollTrigger: {
        trigger: buttonRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  return (
    <section className="">
      <Container classnames="">
        <div ref={titleRef}>
          <Text
            as="h5"
            level="3xl"
            classnames="text-secondary-500 mb-4 font-bold"
          >
            {title}
          </Text>
        </div>
        <div className={`lg:columns-${columns} gap-x-8`}>
          <div ref={descriptionRef}>
            <RichText
              text={description}
              classnames="text-primary-700 font-light"
            />
          </div>
          <div className="space-x-4" ref={buttonRef}>
            {buttons &&
              buttons.map((button) => (
                <Button key={button.href} {...button} classnames="mt-4" />
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
