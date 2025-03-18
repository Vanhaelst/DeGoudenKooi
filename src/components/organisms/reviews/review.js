import { Container } from "@/components/atoms";
import { Title } from "@/components/molecules";
import React from "react";
import { Review } from "@/components/organisms/reviews/index";

export const Reviews = ({ reviews }) => {
  console.log("reviews", reviews);
  return (
    <section className={`pb-24 md:py-12 `}>
      <Container classnames="flex justify-center mb-8">
        <Title title={"Reviews"} />
      </Container>
      <Container classnames="grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-y-0">
        {reviews?.map((review, index) => (
          <Review key={review.id} {...review} index={index} />
        ))}
      </Container>
    </section>
  );
};
