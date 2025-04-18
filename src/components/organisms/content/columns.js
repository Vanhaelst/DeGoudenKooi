import { Button, Container, RichText, Text } from "@/components/atoms";
import React from "react";

export const Columns = ({
  title,
  descriptionLeft,
  descriptionRight,
  buttons,
  buttonsLeft,
}) => {
  return (
    <section className="">
      <Container classnames="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Text
          as="h5"
          level="3xl"
          classnames="text-secondary-500 mb-4 font-bold"
        >
          {title}
        </Text>
      </Container>
      <Container classnames="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <RichText
            level="lg"
            text={descriptionLeft}
            classnames="text-primary-700 font-light"
          />
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {buttonsLeft &&
              buttonsLeft.map((button) => (
                <Button key={button.href} {...button} classnames="mt-4" />
              ))}
          </div>
        </div>
        <div>
          <RichText
            level="lg"
            text={descriptionRight}
            classnames="text-primary-700 font-light"
          />
          <div className="space-y-4 md:space-y-0 md:space-x-4">
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
