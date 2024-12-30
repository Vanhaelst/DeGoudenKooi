import { Button, Container, RichText, Text } from "@/components/atoms";
import React from "react";

export const Content = ({ title, description, buttons, columns }) => {
  return (
    <section className="">
      <Container classnames="">
        <Text as="h5" level="3xl" classnames="text-secondary-500 mb-4">
          {title}
        </Text>
        <div className={`lg:columns-${columns} gap-x-8`}>
          <RichText text={description} classnames="text-primary-700" />
          {buttons &&
            buttons.map((button) => (
              <Button key={button.href} {...button} classnames="mt-4" />
            ))}
        </div>
      </Container>
    </section>
  );
};
