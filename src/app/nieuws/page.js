import React from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { RichText, Text } from "@/components/atoms";
import { imageQuery } from "@/queries/entries/image";
import { formatDate } from "@/utils/formatDate";

async function getBlogs() {
  return fetchData(
    `query MyQuery {
      blogs: blogEntries {
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

export default async function Home() {
  const { blogs } = await getBlogs();

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              From the blog
            </h2>
            <Text level="xl" as="p" classnames="mt-2 text-gray-600">
              Learn how to grow your business with our expert advice.
            </Text>
            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {blogs.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <Image
                      alt=""
                      src={post.image[0].url}
                      width={post.image[0].width}
                      height={post.image[0].height}
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
                        className="mt-5 text-sm/6 text-gray-600"
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
