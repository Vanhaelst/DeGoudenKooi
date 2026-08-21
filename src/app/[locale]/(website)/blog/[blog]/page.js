import React from "react";
import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { imageQuery } from "@/queries/entries/image";
import { Hero } from "@/components/molecules/hero/hero";
import { contentEntry } from "@/queries/entries/content";
import { featuresEntry } from "@/queries/entries/features";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { lightboxEntry } from "@/queries/entries/lightbox";
import { videoEntry } from "@/queries/entries/video";
import { LINKS } from "@/enums/links";

import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";
import { redirect } from "next/navigation";
import {
  absoluteUrl,
  breadcrumbSchema,
  createJsonLd,
  getLanguage,
  getPageUrl,
  getSeoValues,
  JsonLdScript,
  SITE_URL,
  webpageSchema,
} from "@/utils/jsonLd";

const query = ({ pathname, language = "nl" }) => {
  return `
        query MyQuery {
              blog: blogsEntries(slug: "${pathname}", language: "${language}") {
                  ... on newsItem_Entry {
                      id
                      title
                      shortDescription
                      postDate
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
  return fetchData(query({ pathname, language }), {
    revalidate: REVALIDATE,
    tags: [`blog-${pathname}`, `language-${language}`],
  });
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `
        query MyQuery {
        page: blogsEntries(slug: "${params.blog}", language: "${params.locale}") {
        ... on newsItem_Entry {
                id
                title
                image ${imageQuery}
                ${seoEntry}
            }
        }
    }`,
    {
      revalidate: REVALIDATE,
      tags: [`metadata-${params.blog}`, `language-${params.locale}`],
    },
  );

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

  const currentBlog = blog?.[0];
  const { image, title, shortDescription, postDate, blogsections } =
    currentBlog || {};

  if (blog.length === 0) {
    redirect(params.locale === "en" ? LINKS.EN.BLOG : LINKS.NL.BLOG);
  }

  const path = `blog/${params.blog}`;
  const webPage = webpageSchema({
    locale: params.locale,
    path,
    page: currentBlog,
  });
  const seo = getSeoValues({ locale: params.locale, page: currentBlog });
  const jsonLd = createJsonLd([
    {
      ...webPage,
      mainEntity: {
        "@id": `${webPage.url}#article`,
      },
    },
    {
      "@type": "BlogPosting",
      "@id": `${webPage.url}#article`,
      url: webPage.url,
      headline: title,
      description: webPage.description,
      datePublished: postDate,
      articleSection: "Blog",
      mainEntityOfPage: {
        "@id": `${webPage.url}#webpage`,
      },
      image: image?.[0]?.url ? absoluteUrl(image[0].url) : seo.image,
      author: {
        "@id": `${SITE_URL}/#organization`,
      },
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: getLanguage(params.locale),
    },
    breadcrumbSchema({
      locale: params.locale,
      items: [
        { name: "Blog", url: getPageUrl(params.locale, "blog") },
        { name: title, url: webPage.url },
      ],
    }),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
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
