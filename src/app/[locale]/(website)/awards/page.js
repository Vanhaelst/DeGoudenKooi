import React from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { Hero } from "@/components/molecules/hero/hero";
import { awardsQuery } from "@/queries/sections/awards";
import { Container, RichText } from "@/components/atoms";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { FixedPageQuery } from "@/queries/sections/fixedPage";
import { renderComponents } from "@/utils/renderComponents";
import { seoEntry } from "@/queries/entries/seo";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";
import { Awards } from "@/app/[locale]/(website)/awards/client";

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `query MyQuery {
      page: awardspageEntries(language: "${params.locale}") {
        ... on FixedPage_Entry {
          id
          ${seoEntry}
        }
      }
    }`,
  );

  const { seoTitle, seoDescription, seoKeywords, seoImage } = page?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    title: seoTitle || defaultMetadata.title,
    description: seoDescription || metaData.description,
    keywords: seoKeywords || metaData.keywords,
    images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,

    openGraph: {
      ...defaultMetadata.openGraph,
      title: seoTitle || defaultMetadata.title,
      description: seoDescription || metaData.description,
      url: defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

async function getPage({ language, token }) {
  return fetchData(
    FixedPageQuery({ page: "awardspageEntries", language }),
    {},
    token,
  );
}

const amount = 5;
const getAwards = ({ locale, token }) => {
  return fetchData(
    awardsQuery({ locale, visibility: "awardsPage", limit: amount }),
    {},
    token,
  );
};

export default async function Home({ params, searchParams }) {
  const { awards, count } = await getAwards({
    locale: params.locale,
    token: searchParams["x-craft-live-preview"],
  });
  const { page } = await getPage({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });

  const {
    title,
    description,
    image,
    buttons,
    type,
    backgroundColor,
    backgroundImage,
    transparentImage,
    sections,
  } = page[0] ?? {};

  return (
    <>
      <Hero
        type={type}
        title={title}
        description={description}
        buttons={buttons}
        image={image}
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
      />
      <ImageWrapper image={transparentImage?.[0]}>
        <section className="py-12 sm:py-16">
          <Container classnames="grid grid-cols-12 relative">
            <div className="col-span-1" />
            <Awards
              defaultAwards={awards}
              locale={params.locale}
              amount={amount}
              count={count}
            />
          </Container>
        </section>
      </ImageWrapper>

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
