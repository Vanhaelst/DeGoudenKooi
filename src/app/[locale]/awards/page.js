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

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `query MyQuery {
      page: planningEntries(language: "${params.locale}") {
        ... on FixedPage_Entry {
          id
          ${seoEntry}
        }
      }
    }`,
  );

  const { seoTitle, seoDescription, seoKeywords, seoUrl, seoImage } = page?.[0];

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
      url: seoUrl || defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

async function getPage({ language }) {
  return fetchData(FixedPageQuery({ page: "planningEntries", language }));
}

const getAwards = () => {
  return fetchData(awardsQuery({}));
};

export default async function Home({ params }) {
  const { awards } = await getAwards({ language: params.locale });
  const { page } = await getPage({ language: params.locale });

  const {
    title,
    description,
    image,
    buttons,
    type,
    backgroundColor,
    backgroundImage,
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

      <section className="py-24 sm:py-32">
        <Container classnames="grid grid-cols-12 relative">
          <div className="col-span-1" />
          <ul
            role="list"
            className=" space-y-12 divide-y divide-gray-200 col-span-12 lg:col-span-10"
          >
            {awards.map(({ image, title, description }, person) => (
              <li
                key={person.title}
                className="flex flex-col items-start gap-10 pt-12 lg:flex-row"
              >
                <Image
                  src={image?.[0]?.url}
                  alt={image?.[0]?.alt}
                  width={image?.[0]?.width}
                  height={image?.[0]?.height}
                  className={`min-w-40 w-40 object-contain`}
                />

                <div className="">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
                    {title}
                  </h3>
                  <RichText text={description} className="mt-6 text-gray-600" />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
