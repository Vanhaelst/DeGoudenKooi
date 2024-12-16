import { Container, RichText, Text } from "@/components/atoms";
import Image from "next/image";
import React from "react";
import { Feature } from "@/components/molecules";

export const Features = ({ title, description, features }) => {
  return (
    <section className="bg-[#F7F6F2] py-24 sm:py-32">
      <Container classnames="mb-24">
        <div className="md:max-w-[60%] lg:max-w-[40%]">
          <Image
            src="/artwork-diamond.png"
            alt="diamond artwork"
            className="mb-2"
            width={45}
            height={45}
          />
          {title && (
            <Text as="h5" level="3xl" classnames="text-secondary-500">
              {title}
            </Text>
          )}
          {description && (
            <RichText
              text={description}
              classnames="text-primary-700 text-center"
            />
          )}
        </div>
      </Container>
      <Container classnames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features?.map((feature) => {
          return <Feature key={feature.title} {...feature} />;
        })}
      </Container>
    </section>
  );
};
