import React from "react";
import { Container } from "@/components/atoms";
import { ReviewCard } from "@/components/molecules/reviews/review-card-small";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { HeroContent } from "@/components/molecules/hero/content";
import { HeroAwards } from "@/components/molecules/hero/awards";
import { Images } from "@/components/molecules/image/image";

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
          <HeroContent
            title={title}
            description={description}
            buttons={buttons}
          />
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
          <HeroContent
            title={title}
            description={description}
            buttons={buttons}
          />
          <Images images={image} />
        </Container>
        <HeroAwards awards={awards} showAwards={showAwards} />
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
        <HeroContent
          title={title}
          description={description}
          buttons={buttons}
        />
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
          <Images images={image} />
        </div>
      </Container>
      <HeroAwards awards={awards} showAwards={showAwards} />
    </section>
  );
};
