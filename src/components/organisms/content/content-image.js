import { Title } from "@/components/molecules";
import { Button, Container } from "@/components/atoms";
import React from "react";

export const ContentImage = ({ title, description, buttons, image, order }) => {
  const contentLeft = order;

  return (
    <section className="">
      <Container classnames="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`${contentLeft ? "order-1" : "order-2"}`}>
            <Title title={title} description={description} />
            {buttons &&
              buttons.map((button) => (
                <Button key={button.href} {...button} classnames="mt-4" />
              ))}
          </div>

          {image?.[0] && (
            <div
              className={`bg-primary-500 rounded-2xl min-h-[300px] h-full w-full bg-cover bg-center ${contentLeft ? "order-2" : "order-1"}`}
              style={{ backgroundImage: `url('${image[0].url}')` }}
            />
          )}
        </div>
      </Container>
    </section>
  );
};
