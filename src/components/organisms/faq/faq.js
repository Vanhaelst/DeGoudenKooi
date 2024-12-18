import React from "react";
import { fetchData } from "@/utils/fetchData";
import { Container } from "@/components/atoms";
import { Accordion, Title } from "@/components/molecules";
import { faqQuery } from "@/queries/sections/faq";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

async function getPage({ categories }) {
  return fetchData(faqQuery({ categories }));
}

export const Faq = async ({
  title,
  description,
  categories,
  backgroundColor,
}) => {
  const { faq } = (await getPage({ categories })) ?? undefined;
  const bgColor = getBackgroundColor(backgroundColor);

  if (!faq) {
    return null;
  }

  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="">
        <Title title={title} description={description} />
        <div className="divide-y">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
};
