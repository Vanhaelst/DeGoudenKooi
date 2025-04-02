import { Button, Container, RichText, Text } from "@/components/atoms";
import React from "react";
import { clsx } from "clsx";

export const ColumnsWithDivider = ({ title, column, center }) => {
  return (
    <section className="">
      <Container classnames="mb-8">
        <Text
          as="h5"
          level="3xl"
          classnames={clsx(
            "text-secondary-500 mb-4 font-bold",
            center ? "text-center" : "",
          )}
        >
          {title}
        </Text>
      </Container>
      <Container classnames="grid grid-cols-1 lg:grid-cols-2 divide-x-2 divide-primary-500">
        {column?.map(({ id, heading, description, buttons }) => {
          return (
            <div key={id}>
              <div>
                <Text
                  as="h5"
                  level="xl"
                  classnames={clsx(
                    "text-secondary-500 mb-4 font-bold",
                    center ? "text-center" : "",
                  )}
                >
                  {heading}
                </Text>
              </div>
              <RichText
                level="lg"
                text={description}
                classnames={clsx(
                  "text-primary-700 font-light",
                  center ? "text-center" : "",
                )}
              />
              <div
                className={clsx(
                  "space-y-4 md:space-y-0 md:space-x-4",
                  center ? "mx-auto" : "",
                )}
              >
                {buttons &&
                  buttons.map((button) => (
                    <Button key={button.href} {...button} classnames="mt-4" />
                  ))}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
};
