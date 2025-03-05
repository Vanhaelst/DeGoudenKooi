import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { Container, RichText, Text } from "@/components/atoms";
import React from "react";
import { imageQuery } from "@/queries/entries/image";
import { CompanyData } from "@/data/companyData";
import { Title } from "@/components/molecules";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { SeoQuery } from "@/queries/sections/seo";

async function getPage() {
  return fetchData(PageQuery({ page: "aboutUsEntries" }));
}
async function getBlogs({ language }) {
  return fetchData(
    `query MyQuery {
      blogs: newsEntries(language: "${language}", orderBy: "postDate desc") {
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
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  {post.image?.[0]?.url ? (
                    <Image
                      alt=""
                      src={post.image?.[0]?.url}
                      width={post.image?.[0]?.width}
                      height={post.image?.[0]?.height}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                  ) : (
                    <Image
                      alt=""
                      src={CompanyData.logo}
                      width={CompanyData.logo_width}
                      height={CompanyData.logo_height}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-contain px-2"
                    />
                  )}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.postDate} className="text-gray-500">
                        {formatDate(post.postDate)}
                      </time>
                    </div>
                    <div className="group relative max-w-xl">
                      <Text
                        level="xl"
                        as="p"
                        classnames="mt-3 font-semibold text-gray-900"
                      >
                        {post.title}
                      </Text>
                      <RichText
                        text={post.description}
                        className="mt-5 text-sm/6 text-gray-600 font-light"
                      />
                    </div>
                  </div>

                  <div>
                    {post?.links.map((link) => {
                      return (
                        <a key={link.href} href={link.href} target="_blank">
                          <Text
                            level="sm"
                            as="span"
                            classnames="mt-3 font-semibold text-primary-500 hover:text-secondary-500 transition-all"
                          >
                            {link.title}
                          </Text>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
