import React from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { RichText, Text } from "@/components/atoms";
import { imageQuery } from "@/queries/entries/image";
import { formatDate } from "@/utils/formatDate";
import { renderComponents } from "@/utils/renderComponents";
import { PageQuery } from "@/queries/sections/page";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { SeoQuery } from "@/queries/sections/seo";

async function getPage() {
  return fetchData(PageQuery({ page: "blogEntries" }));
}

async function getBlogs({ language }) {
  return fetchData(
    `query MyQuery {
      blogs: blogsEntries(language: "${language}") {
        ... on newsItem_Entry {
          id
          slug: uri
          title
          postDate
          shortDescription
          image ${imageQuery}
        }
      }
    }`,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "blogEntries", language: params.locale }),
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
  const { blogs } = await getBlogs({ language: "nl" }); // params.locale });

  const sections = page[0]?.sections;

  return (
    <>
      {sections?.map((section) => renderComponents(section, params.locale))}

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 mt-16 gap-20 lg:mt-20 lg:space-y-20">
              {blogs.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <Image
                      alt=""
                      src={post.image[0]?.url}
                      width={post.image[0]?.width}
                      height={post.image[0]?.height}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
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
                        classnames="mt-3 font-semibold text-gray-900 group-hover:text-gray-600"
                      >
                        <a href={post.slug}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </Text>
                      <RichText
                        text={post.shortDescription}
                        classnames=" font-light"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
