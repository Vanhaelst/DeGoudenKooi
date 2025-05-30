import React from "react";

import { Container } from "@/components/atoms";
import { Accordion, Title } from "@/components/molecules";

export const Faq = ({ title, description, faq, center }) => {
  if (!faq) {
    return null;
  }

  return (
    <section className={`py-12 sm:py-16`}>
      <Container classnames="">
        <Title title={title} description={description} center={center} />
        <div className="divide-y">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
};
