import { Container } from "@/components/atoms";
import React from "react";
import { Feature, Title } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

export const Features = ({ title, description, features, backgroundColor }) => {
  const bgColor = getBackgroundColor(backgroundColor);

  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="mb-24">
        <Title title={title} description={description} />
      </Container>
      <Container classnames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features?.map((feature, index) => {
          return <Feature key={feature.title} {...feature} index={index} />;
        })}
      </Container>
    </section>
  );
};
