import { Button, Container, RichText, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { clsx } from "clsx";
import React from "react";

export const Banner = ({ title, description, buttons, backgroundImage }) => {
  return (
    <section
      className={clsx("bg-top bg-cover", "py-40 -mb-20")}
      style={{ backgroundImage: `url("${backgroundImage?.[0]?.url}")` }}
    >
      <Container>
        {title && (
          <Text as="h5" level="3xl" classnames="text-white mb-4 font-bold">
            {title}
          </Text>
        )}
        {description && (
          <RichText
            text={description}
            level="lg"
            classnames="text-white font-light"
          />
        )}

        <div className="mx-auto lg:mx-0 space-y-4 md:space-y-0 md:space-x-4 mt-6">
          {buttons?.map(({ href, variant, callToAction }) => {
            return (
              <Button
                key={href}
                variant={variant}
                href={href}
                callToAction={callToAction.toUpperCase()}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};
