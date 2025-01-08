"use client";

import { useEffect, useRef } from "react";
import { Title } from "@/components/molecules";
import { Button, Container } from "@/components/atoms";
import { Images } from "@/components/molecules/image/image";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const ContentImage = ({
  title,
  subtitle,
  description,
  buttons,
  image,
  order,
}) => {
  const contentLeft = order;

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
    <section className="">
      <Container classnames="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`${contentLeft ? "md:order-1" : "md:order-2"} order-2 flex flex-col justify-center`}
          >
            <Title
              title={title}
              subtitle={subtitle}
              description={description}
              showIcon={false}
            />
            <div className="space-x-4" ref={elementRef}>
              {buttons &&
                buttons.map((button) => (
                  <Button key={button.href} {...button} classnames="mt-4" />
                ))}
            </div>
          </div>

          <Images
            images={image}
            classnames={`${contentLeft ? "md:order-2" : "md:order-1"} order-1`}
          />
        </div>
      </Container>
    </section>
  );
};
