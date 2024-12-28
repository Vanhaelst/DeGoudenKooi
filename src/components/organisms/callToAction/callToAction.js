import React from "react";
import { Container } from "@/components/atoms";
import { Cta } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

export const CallToAction = (data) => {
  const bgColor = getBackgroundColor(data.backgroundColor);

  return (
    <section className={`${bgColor} ${data.pullUp ? "" : "pt-24"}`}>
      <Container classnames="">
        <Cta {...data} />
      </Container>
    </section>
  );
};
