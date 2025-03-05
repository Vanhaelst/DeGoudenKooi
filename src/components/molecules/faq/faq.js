import React from "react";

import { Container } from "@/components/atoms";
import { Accordion, Title } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

export const Faq = ({ title, description, faq, backgroundColor }) => {
  if (!faq) {
    return null;
  }

  return (
    <section className={`py-24 sm:py-32`}>
      <Container classnames="">
        <Title title={title} description={description} />
        <div className="divide-y">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
};
