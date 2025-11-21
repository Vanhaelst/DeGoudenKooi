import { Container } from "@/components/atoms";
import React from "react";
import { Form } from "@/components/molecules/contact/form";
import { getDictionary } from "@/app/[locale]/dictionaries";
import Script from "next/script";

export const Contact = async ({ locale, title }) => {
  const dict = await getDictionary(locale);

  return (
    <section className="">
      <Container
        size="xs"
        classnames="p-10 bg-primary-500/90 rounded-2xl -mt-40"
      >
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
          strategy="afterInteractive"
        />
        <Form t={dict.contact} title={title} />
      </Container>
    </section>
  );
};
