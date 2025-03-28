import React from "react";
import { fetchData } from "@/utils/fetchData";
import { Container } from "@/components/atoms";
import { Accordion, Title } from "@/components/molecules";
import { faqQuery } from "@/queries/sections/faq";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

async function getPage({ categories, filters }) {
  return fetchData(faqQuery({ categories, filters }));
}

export const Faq = async ({
  title,
  description,
  categories,
  filters,
  backgroundColor,
}) => {
  const { faq } = (await getPage({ categories, filters })) ?? undefined;
  const bgColor = getBackgroundColor(backgroundColor);

  if (!faq) {
    return null;
  }

  return (
    <section className={`${bgColor} py-10 sm:py-16`}>
      <Container classnames="">
        <Title title={title} description={description} />
        <div className="divide-y">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
};
