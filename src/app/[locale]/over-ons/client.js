"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { Button, RichText, Text } from "@/components/atoms";
import { imageQuery } from "@/queries/entries/image";
import { CompanyData } from "@/data/companyData";

async function getBlogs({ language, offset, amount }) {
  return fetchData(
    `query MyQuery {
      blogs: newsEntries(language: "${language}", orderBy: "postDate desc", limit: ${amount}, offset: ${offset}) {
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

export const NewsPaginated = ({ news, locale, amount }) => {
  const [page, setPage] = useState(1);
  const [newsItems, setNewsItems] = useState(news);

  useEffect(() => {
    if (page !== 1) {
      getBlogs({ language: locale, offset: page * amount, amount }).then(
        ({ blogs }) => {
          console.log(blogs);
          setNewsItems((prevState) => [...prevState, ...blogs]);
        },
      );
    }
  }, [page]);

  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {newsItems.map((post) => (
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

      <div className="w-full flex justify-center">
        <Button
          variant={"primary"}
          onClick={() => setPage((prevState) => prevState + 1)}
          callToAction={"Laad meer"}
        />
      </div>
    </div>
  );
};
