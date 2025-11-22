import { Container } from "@/components/atoms";
import React from "react";
import { Form } from "@/components/molecules/contact/form";
import { getDictionary } from "@/app/[locale]/dictionaries";

export const Contact = async ({ locale, title }) => {
  const dict = await getDictionary(locale);

  return (
    <section className="">
      <Container
        size="xs"
        classnames="p-10 bg-primary-500/90 rounded-2xl -mt-40"
      >
        <Form t={dict.contact} title={title} />
      </Container>
    </section>
  );
};
