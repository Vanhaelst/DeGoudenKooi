"use client";

import { useEffect, useRef } from "react";
import { Title } from "@/components/molecules";
import { Button, Container } from "@/components/atoms";
import { Images } from "@/components/molecules/image/image";

import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { Video } from "@/components/molecules/video/video";
gsap.registerPlugin(ScrollTrigger);

export const ContentVideo = ({
  title,
  subtitle,
  description,
  buttons,
  videoType,
  videoPlayer,
  image,
  videoUrl,
  order,
  detail = false,
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
    <section>
      <Container classnames="">
        <div
          ref={elementRef}
          className={`grid grid-cols-1 ${detail ? " md:grid-cols-5 gap-8 md:gap-16" : " lg:grid-cols-2 gap-8"} `}
        >
          <div
            className={clsx(
              contentLeft && !detail ? "lg:order-1 items-end" : "lg:order-2",
              contentLeft && detail ? "md:order-1 items-end" : "md:order-2",
              detail ? "md:col-span-3 max-w-xl" : "",
              "order-2 flex flex-col justify-center",
            )}
          >
            <div className={`${detail ? "md:max-w-[80%]" : ""} `}>
              <Title
                title={title}
                subtitle={subtitle}
                description={description}
                showIcon={false}
              />
              <div className="space-y-4 md:space-y-0 md:space-x-4">
                {buttons &&
                  buttons.map((button) => (
                    <Button key={button?.href} {...button} classnames="mt-4" />
                  ))}
              </div>
            </div>
          </div>
          <div
            className={clsx(
              detail
                ? contentLeft
                  ? "md:order-2"
                  : "md:order-1"
                : contentLeft
                  ? "lg:order-2"
                  : "lg:order-1",
              detail ? "md:col-span-2" : " ",
            )}
            ref={elementRef}
          >
            <Video
              type="content"
              videoType={videoType}
              videoPlayer={videoPlayer}
              image={image}
              videoId={videoUrl}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
