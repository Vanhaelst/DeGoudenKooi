import React from "react";
import { notFound } from "next/navigation";
import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { imageQuery } from "@/queries/entries/image";
import { Hero } from "@/components/molecules/hero/hero";
import { LINKS } from "@/enums/links";

import nl from "@/app/[locale]/dictionaries/nl.json";
import en from "@/app/[locale]/dictionaries/en.json";
import {
  defaultMetadata,
  getAlternates,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import {
  absoluteUrl,
  breadcrumbSchema,
  cleanText,
  createJsonLd,
  getLanguage,
  getPageUrl,
  getSeoValues,
  JsonLdScript,
  organizationSchema,
  SITE_URL,
  webpageSchema,
  websiteSchema,
} from "@/utils/jsonLd";

const query = ({ pathname, language = "nl", token }) => {
  return `
        query NewsArticleQuery {
              article: newsEntries(slug: "${pathname}", language: "${language}") {
                  ... on article_Entry {
                      id
                      title
                      description
                      postDate
                      dateUpdated
                      uri
                      slug
                      image ${imageQuery}

                      links {
                        ... on link_Entry {
                          title
                          href
                        }
                      }
                  }
              }
        }
  `;
};

async function getPage({ pathname, language, token }) {
  return fetchData(
    query({ pathname, language }),
    {
      revalidate: REVALIDATE,
      tags: [`page-${pathname}`, `language-${language}`],
    },
    token,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `
        query NewsArticleMetadataQuery {
        page: newsEntries(slug: "${params.nieuws}", language: "${params.locale}") {
        ... on article_Entry {
                id
                title
                description
                postDate
                dateUpdated
                image ${imageQuery}
            }
        }
    }`,
    {
      revalidate: REVALIDATE,
      tags: [`metadata-${params.nieuws}`, `language-${params.locale}`],
    },
  );

  const { title, description, postDate, dateUpdated, image } = page?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  const alternates = getAlternates({
    locale: params.locale,
    path: `nieuws/${params.nieuws}`,
  });
  const metaDescription = cleanText(description) || metaData.description;

  return {
    ...defaultMetadata,
    alternates,
    title: title || defaultMetadata.title,
    description: metaDescription,
    keywords: metaData.keywords,
    images: image?.[0]?.url || defaultMetadata.openGraph.image,

    openGraph: {
      ...defaultMetadata.openGraph,
      type: "article",
      title: title || defaultMetadata.title,
      description: metaDescription,
      url: alternates.canonical,
      images: image?.[0]?.url || defaultMetadata.openGraph.image,
      publishedTime: postDate,
      modifiedTime: dateUpdated || postDate,
    },
  };
}

export default async function News({ params, searchParams }) {
  const { article } = await getPage({
    pathname: params.nieuws,
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });

  const currentNews = article?.[0];

  if (!currentNews) {
    notFound();
  }

  const { image, title, description, postDate, dateUpdated, links } =
    currentNews;
  const buttons = links
    ?.filter((link) => link?.href && link?.title)
    .map((link) => ({
      callToAction: link.title,
      href: link.href,
      target: "external",
      variant: "primary",
    }));

  const t = params.locale === "en" ? en : nl;
  const pages = [
    {
      name: t.topbar.news,
      href: LINKS[params.locale.toUpperCase()]?.NEWS,
      current: false,
    },
    { name: title, href: "#", current: true },
  ];

  const newsPath = params.locale === "en" ? "news" : "nieuws";
  const path = `${newsPath}/${params.nieuws}`;
  const webPage = webpageSchema({
    locale: params.locale,
    path,
    page: currentNews,
  });
  const seo = getSeoValues({ locale: params.locale, page: currentNews });
  const jsonLd = createJsonLd([
    organizationSchema(),
    websiteSchema(),
    {
      ...webPage,
      mainEntity: {
        "@id": `${webPage.url}#article`,
      },
    },
    {
      "@type": "NewsArticle",
      "@id": `${webPage.url}#article`,
      url: webPage.url,
      headline: title,
      description: webPage.description,
      datePublished: postDate,
      dateModified: dateUpdated || postDate,
      articleSection: t.topbar.news,
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
        { name: t.topbar.news, url: getPageUrl(params.locale, newsPath) },
        { name: title, url: webPage.url },
      ],
    }),
  ]);
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <Hero
        title={title}
        description={description}
        buttons={buttons}
        type="horizontal"
        backgroundColor="lightGray"
        image={image}
        awards={false}
      />
      <div className="pb-20" />
    </>
  );
}
