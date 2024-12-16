import { Button, Container, RichText, Text } from "@/components/atoms";
import { ReviewCard } from "@/components/molecules/reviews/review-card-small";
import { Slider } from "@/components/molecules";
import Image from "next/image";
import React from "react";
import { fetchData } from "@/utils/fetchData";
import { awardsQuery } from "@/queries/sections/awards";

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

async function getPage({ grade }) {
  return fetchData(awardsQuery({ grade }));
}

export const Hero = async ({
  title,
  description,
  buttons,
  image,
  reviews,
  type,
  showAwards,
}) => {
  const { awards } = (await getPage({})) ?? undefined;
  const evenReviews = reviews?.filter((review, index) => index % 2 === 0);
  const oddReviews = reviews?.filter((review, index) => index % 2 === 1);

  if (type === "vertical") {
    return (
      <section>
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
              className="mt-12 bg-primary-500 rounded-2xl min-h-80 w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image[0].url}')` }}
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
    <section>
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
              className="bg-primary-500 rounded-2xl h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${image[0].url}')` }}
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
