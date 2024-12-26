import { Button, Container, RichText, Text } from "@/components/atoms";
import { ReviewCard } from "@/components/molecules/reviews/review-card-small";
import { Slider } from "@/components/molecules";
import Image from "next/image";
import React from "react";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

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

export const Hero = ({
  title,
  description,
  buttons,
  image,
  backgroundImage,
  reviews,
  type,
  showAwards,
  backgroundColor,
  awards,
  videoId,
  videoPlayer = "youtube",
}) => {
  const evenReviews = reviews?.filter((review, index) => index % 2 === 0);
  const oddReviews = reviews?.filter((review, index) => index % 2 === 1);

  const bgColor = getBackgroundColor(backgroundColor);

  if (type === "video") {
    return (
      <section className="hero relative flex h-[80vh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="video-wrapper">
          {videoPlayer === "vimeo" && (
            <iframe
              src={`https://player.vimeo.com/video/${videoId}?h=ab6adab836&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&autopause=0&background=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="video"
              title="Intro video"
            />
          )}
          {videoPlayer === "youtube" && (
            <iframe
              width="568"
              height="319"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1`}
              title="Het geheim van Sint-Rumoldus (trailer) (De Gouden Kooi - Escape experience)"
              frameBorder="0"
              className="video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <Container classnames="py-20">
          <div className="lg:max-w-[65%]">
            <Text as={"h1"} level="4xl" classnames="text-secondary-500">
              {title}
            </Text>
            {description && (
              <RichText text={description} classnames="text-primary-700" />
            )}
            <div className="space-x-2 mt-6">
              {buttons?.map(({ href, variant, callToAction }) => {
                return (
                  <Button
                    key={href}
                    variant={variant}
                    href={href}
                    callToAction={callToAction}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (type === "vertical") {
    return (
      <section
        className={`${bgColor}  bg-cover bg-center`}
        style={{ backgroundImage: `url('${backgroundImage?.[0]?.url}')` }}
      >
        <Container classnames="py-20">
          <div className="lg:max-w-[65%]">
            <Text as={"h1"} level="4xl" classnames="text-secondary-500">
              {title}
            </Text>
            {description && (
              <RichText text={description} classnames="text-primary-700" />
            )}
            <div className="space-x-2 mt-6">
              {buttons?.map(({ href, variant, callToAction }) => {
                return (
                  <Button
                    key={href}
                    variant={variant}
                    href={href}
                    callToAction={callToAction}
                  />
                );
              })}
            </div>
          </div>
          {image?.[0] && (
            <div
              className="mt-12 rounded-2xl min-h-80 w-full bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url('${image?.[0]?.url}')` }}
            />
          )}
        </Container>
        {awards?.length > 0 && showAwards && (
          <Container classnames="py-10 xl:py-20">
            <Slider settings={settings}>
              {awards?.map(({ image }) => {
                const { alt, url, width, height } = image?.[0];
                return (
                  <div key={url} className="px-9">
                    <Image
                      src={url}
                      alt={alt}
                      width={width}
                      height={height}
                      className="w-24 lg:w-36 lg:h-36 object-contain"
                    />
                  </div>
                );
              })}
            </Slider>
          </Container>
        )}
      </section>
    );
  }

  /* TODO: animate reviews
   * - split review in 2 arrays (even / uneven)
   * - Animate the reviews so the next one appears and the previous one disappears.
   */

  return (
    <section
      className={`${bgColor}  bg-cover bg-center`}
      style={{ backgroundImage: `url('${backgroundImage?.[0]?.url}')` }}
    >
      <Container classnames="py-20 grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:max-w-[90%] pb-14 lg:py-28">
          <Text as={"h1"} level="4xl" classnames="text-secondary-500">
            {title}
          </Text>
          {description && (
            <RichText text={description} classnames="text-primary-700" />
          )}
          <div className="space-x-2 mt-6">
            {buttons?.map(({ href, variant, callToAction }) => {
              return (
                <Button
                  key={href}
                  variant={variant}
                  href={href}
                  callToAction={callToAction}
                />
              );
            })}
          </div>
        </div>
        <div className="lg:pl-10 xl:pl-36 w-full min-h-96">
          <div className="lg:hidden">
            {reviews?.map((review) => {
              return (
                <div key={title} className="ml-4 absolute bottom-24">
                  <ReviewCard {...review} />
                </div>
              );
            })}
          </div>

          {reviews && (
            <div className="hidden lg:block">
              {evenReviews?.map((review) => {
                return (
                  <div key={title} className="ml-12 absolute bottom-64">
                    <ReviewCard {...review} />
                  </div>
                );
              })}

              {oddReviews?.map((review) => {
                return (
                  <div
                    key={title}
                    className="-ml-32 lg:-ml-24 xl:-ml-32 absolute bottom-32"
                  >
                    <ReviewCard {...review} />
                  </div>
                );
              })}
            </div>
          )}
          {image?.[0] && (
            <div
              className="rounded-2xl h-full w-full bg-contain bg-no-repeat bg-center float"
              style={{ backgroundImage: `url('${image?.[0]?.url}')` }}
            />
          )}
        </div>
      </Container>
      {awards?.length > 0 && showAwards && (
        <Container classnames="py-10 xl:py-20">
          <Slider settings={settings}>
            {awards?.map(({ image }) => {
              const { alt, url, width, height } = image?.[0];
              return (
                <div key={url} className="px-9">
                  <Image
                    src={url}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-24 lg:w-36 lg:h-36 object-contain"
                  />
                </div>
              );
            })}
          </Slider>
        </Container>
      )}
    </section>
  );
};
