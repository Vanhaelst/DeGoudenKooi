import React from "react";

import { Container } from "@/components/atoms";
import { Accordion, Title } from "@/components/molecules";

export const Faq = ({ title, description, faq, backgroundColor }) => {
  if (!faq) {
    return null;
  }

  return (
    <section className={`py-12 sm:py-16 md:pb-48`}>
      <Container classnames="">
        <Title title={title} description={description} />
        <div className="divide-y">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
};
