import { Container, RichText, Text } from "@/components/atoms";
import React from "react";
import { Accordion } from "@/components/molecules/accordeon/accordeon";

export const Faq = ({ title, description, faq }) => {
  return (
    <section className="bg-[#F7F6F2] py-24 sm:py-32">
      <Container classnames="">
        <div className="md:max-w-[60%] lg:max-w-[40%]">
          {title && (
            <Text as="h5" level="3xl" classnames="text-secondary-500">
              {title}
            </Text>
          )}
          {description && (
            <RichText text={description} classnames="text-primary-700" />
          )}
        </div>
        <div className="divide-y">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
};
