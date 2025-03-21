import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import { Container } from "@/components/atoms";
import React from "react";
import { imageQuery } from "@/queries/entries/image";
import { Title } from "@/components/molecules";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { SeoQuery } from "@/queries/sections/seo";
import { NewsPaginated } from "./client";

async function getPage() {
  return fetchData(PageQuery({ page: "aboutUsEntries" }));
}
const amount = 5;
async function getBlogs({ language }) {
  return fetchData(
    `query MyQuery {
      blogs: newsEntries(language: "${language}", orderBy: "postDate desc", limit: ${amount}) {
        ... on article_Entry {
          id
          title
          description
          postDate
          image ${imageQuery}
          links {
            ... on link_Entry {
              title
              href
            }
          }
        }
      }
    }`,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "aboutUsEntries", language: params.locale }),
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

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });
  const { blogs } = await getBlogs({ language: params.locale });

  const sections = page[0]?.sections;

  return (
    <>
      {sections?.map((section) => renderComponents(section, params.locale))}

      <section className="py-24 sm:py-32">
        <Container>
          <Title title="De Gouden Kooi in de media" showIcon={false} />
        </Container>
        <Container>
          <NewsPaginated news={blogs} locale={params.locale} amount={amount} />
        </Container>
      </section>
    </>
  );
}
