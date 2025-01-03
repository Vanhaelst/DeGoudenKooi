import { Button, Container, RichText, Text } from "@/components/atoms";
import React from "react";

export const Contact = ({
  title,
  descriptionLeft,
  descriptionRight,
  buttons,
}) => {
  return (
    <section className="">
      <Container classnames="grid grid-cols-2  gap-x-8">
        <Text as="h5" level="3xl" classnames="text-secondary-500 mb-4">
          {title}
        </Text>
      </Container>
      <Container classnames="grid grid-cols-2 gap-x-8">
        <div>
          <RichText text={descriptionLeft} classnames="text-primary-700" />
        </div>
        <div>
          <RichText text={descriptionRight} classnames="text-primary-700" />
          <div className="space-x-4">
            {buttons &&
              buttons.map((button) => (
                <Button key={button.href} {...button} classnames="mt-4" />
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
