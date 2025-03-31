import React from "react";
import { fetchData } from "@/utils/fetchData";
import { Container } from "@/components/atoms";
import { imageQuery } from "@/queries/entries/image";
import { renderComponents } from "@/utils/renderComponents";
import { PageQuery } from "@/queries/sections/page";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { SeoQuery } from "@/queries/sections/seo";
import { NewsPaginated } from "./client";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "blogEntries", language }));
}

const amount = 5;
async function getBlogs({ language }) {
  return fetchData(
    `query MyQuery {
      blogs: blogsEntries(language: "${language}", orderBy: "postDate desc", limit: ${amount}) {
        ... on newsItem_Entry {
          id
          slug: uri
          title
          description: shortDescription
          image ${imageQuery}
        }
      }
      count: entryCount(section: "blogs")
    }`,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "blogEntries", language: params.locale }),
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
  const { blogs, count } = await getBlogs({ language: params.locale });

  const sections = page[0]?.sections;
  const transparentImage = page[0]?.transparentImage?.[0];

  return (
    <>
      {sections?.map((section) => renderComponents(section, params.locale))}
      <ImageWrapper image={transparentImage}>
        <Container classnames="mb-28">
          <NewsPaginated
            news={blogs}
            locale={params.locale}
            amount={amount}
            count={count}
          />
        </Container>
      </ImageWrapper>
    </>
  );
}
