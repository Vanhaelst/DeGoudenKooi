import { Button, Container, Text } from "@/components/atoms";
import { ReviewCard } from "@/components/molecules/reviews/review-card-small";

export const Hero = ({ title, buttons, image, reviews, type }) => {
  const evenReviews = reviews.filter((review, index) => index % 2 === 0);
  const oddReviews = reviews.filter((review, index) => index % 2 === 1);

  if (type === "vertical") {
    return (
      <section>
        <Container classnames="py-20">
          <div className="lg:max-w-[65%]">
            <Text as={"h1"} level="4xl" classnames="text-secondary-500">
              {title}
            </Text>
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
          <div
            className="mt-12 bg-primary-500 rounded-2xl min-h-80 w-full bg-cover bg-center"
            style={{ backgroundImage: image }}
          />
        </Container>
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
        <div className="lg:max-w-[90%] py-14 lg:py-28">
          <Text as={"h1"} level="4xl" classnames="text-secondary-500">
            {title}
          </Text>
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
        <div className="lg:pl-36 w-full min-h-96">
          <div className="lg:hidden">
            {reviews.map((review) => {
              return (
                <div key={title} className="ml-4 absolute bottom-24">
                  <ReviewCard {...review} />
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block">
            {evenReviews.map((review) => {
              return (
                <div key={title} className="ml-12 absolute bottom-64">
                  <ReviewCard {...review} />
                </div>
              );
            })}

            {oddReviews.map((review) => {
              return (
                <div key={title} className="-ml-32 absolute bottom-32">
                  <ReviewCard {...review} />
                </div>
              );
            })}
          </div>

          <div
            className="bg-primary-500 rounded-2xl h-full w-full bg-cover bg-center"
            style={{ backgroundImage: image }}
          />
        </div>
      </Container>
    </section>
  );
};
