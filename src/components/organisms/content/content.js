"use client";

import React, { useEffect, useRef } from "react";
import { Button, Container, RichText, Text } from "@/components/atoms";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
gsap.registerPlugin(ScrollTrigger);

export const Content = ({ title, description, buttons, columns, center }) => {
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
            classnames={clsx(
              "text-secondary-500 mb-4 font-bold",
              center ? "text-center" : "",
            )}
          >
            {title}
          </Text>
        </div>
        <div className={`lg:columns-${columns} gap-x-8`}>
          <div ref={descriptionRef}>
            <RichText
              level="lg"
              text={description}
              classnames={clsx(
                "text-primary-700 font-light",
                center ? "text-center" : "",
              )}
            />
          </div>
          <div
            className={clsx("space-y-4 md:space-x-4", center ? "mx-auto" : "")}
            ref={buttonRef}
          >
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
