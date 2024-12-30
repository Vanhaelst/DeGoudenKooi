import { Title } from "@/components/molecules";
import { Button, Container } from "@/components/atoms";
import React from "react";
import { Images } from "@/components/molecules/image/image";

export const ContentImage = ({ title, description, buttons, image, order }) => {
  const contentLeft = order;

  return (
    <section className="">
      <Container classnames="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`${contentLeft ? "md:order-1" : "md:order-2"} order-2 flex flex-col justify-center`}
          >
            <Title title={title} description={description} showIcon={false} />
            {buttons &&
              buttons.map((button) => (
                <Button key={button.href} {...button} classnames="mt-4" />
              ))}
          </div>

          <Images
            images={image}
            classnames={`${contentLeft ? "md:order-2" : "md:order-1"} order-1`}
          />
        </div>
      </Container>
    </section>
  );
};
