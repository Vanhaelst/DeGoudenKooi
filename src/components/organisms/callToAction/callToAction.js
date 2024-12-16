import React from "react";
import { Container } from "@/components/atoms";
import { Cta } from "@/components/molecules";

export const CallToAction = (data) => {
  return (
    <section className="bg-secondary-700">
      <Container classnames="">
        <Cta {...data} />
      </Container>
    </section>
  );
};
