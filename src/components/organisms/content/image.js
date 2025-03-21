"use client";

import { useEffect, useRef } from "react";
import { Title } from "@/components/molecules";
import { Button, Container } from "@/components/atoms";
import { Images } from "@/components/molecules/image/image";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
gsap.registerPlugin(ScrollTrigger);

export const ContentImageFullWidth = ({
  title,
  subtitle,
  description,
  buttons,
  image,
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);
  return (
    <section>
      <Container classnames="">
        <div ref={elementRef} className="">
          <Title title={title} subtitle={subtitle} description={description} />
          <div className="space-y-4 md:space-y-4 md:space-x-4">
            {buttons &&
              buttons.map((button) => (
                <Button key={button.href} {...button} classnames="mt-4" />
              ))}
          </div>
        </div>
      </Container>
      <Container classnames="">
        <Images images={image} />
      </Container>
    </section>
  );
};
