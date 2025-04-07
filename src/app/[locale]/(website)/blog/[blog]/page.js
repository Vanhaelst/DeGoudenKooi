import React from "react";
import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { imageQuery } from "@/queries/entries/image";
import { Hero } from "@/components/molecules/hero/hero";
import { contentEntry } from "@/queries/entries/content";
import { featuresEntry } from "@/queries/entries/features";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { lightboxEntry } from "@/queries/entries/lightbox";
import { videoEntry } from "@/queries/entries/video";
import { Loader } from "@/components/atoms/loader/loader";
import { LINKS } from "@/enums/links";

import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";
import { redirect } from "next/navigation";

const query = ({ pathname, language = "nl" }) => {
  return `
        query MyQuery {
              blog: blogsEntries(slug: "${pathname}", language: "${language}") {
                  ... on newsItem_Entry {
                      id
                      title
                      shortDescription
                      uri
                      slug
                      image ${imageQuery}
                      
                      blogsections {
                       ${featuresEntry}
                       ${callToActionEntry}
                       ${contentEntry}
                       ${videoEntry}
                       ${lightboxEntry}
                      }
                  }
              }
        }
  `;
};

async function getPage({ pathname, language }) {
  return fetchData(query({ pathname, language }));
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(`
        query MyQuery {
        page: blogsEntries(slug: "${params.blog}", language: "${params.locale}") {
        ... on newsItem_Entry {
                id
                title
                image ${imageQuery}
                ${seoEntry}
            }
        }
    }`);

  const { title, seoTitle, seoDescription, seoKeywords, seoImage, image } =
    page?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    title: seoTitle || title || defaultMetadata.title,
    description: seoDescription || metaData.description,
    keywords: seoKeywords || metaData.keywords,
    images:
      seoImage?.[0]?.url || image?.[0]?.url || defaultMetadata.openGraph.image,

    openGraph: {
      ...defaultMetadata.openGraph,
      title: seoTitle || defaultMetadata.title,
      description: seoDescription || metaData.description,
      url: defaultMetadata.openGraph.url,
      images:
        seoImage?.[0]?.url ||
        image?.[0]?.url ||
        defaultMetadata.openGraph.image,
    },
  };
}

export default async function News({ params }) {
  const { blog } = await getPage({
    pathname: params.blog,
    language: params.locale,
  });

  console.log("blog", blog);

  const { image, title, shortDescription, blogsections } = blog?.[0] || {};

  if (blog.length === 0) {
    redirect(params.locale === "en" ? LINKS.EN.BLOG : LINKS.NL.BLOG);
  }

  return (
    <>
      <Hero
        title={title}
        description={shortDescription}
        type="horizontal"
        backgroundColor="lightGray"
        image={image}
        awards={false}
      />

      {blogsections?.map((section) => renderComponents(section, params.locale))}
      <div className="pb-20" />
    </>
  );
}
