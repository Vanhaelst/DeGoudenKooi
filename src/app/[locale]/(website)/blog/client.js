"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { Button, RichText, Text } from "@/components/atoms";
import { imageQuery } from "@/queries/entries/image";
import { CompanyData } from "@/data/companyData";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

async function getBlogs({ language, offset, amount, token }) {
  return fetchData(
    `query MyQuery {
      blogs: blogsEntries(language: "${language}", orderBy: "postDate desc", offset: ${offset}, limit: ${amount}) {
        ... on newsItem_Entry {
          id
          slug: uri
          title
          description: shortDescription
          image ${imageQuery}
        }
      }
    }`,
    {
      revalidate: RTCEncodedVideoFrame,
      tags: [`blogs`, `language-${language}`],
    },

    token,
  );
}

export const NewsPaginated = ({ news, locale, amount, count }) => {
  const [page, setPage] = useState(1);
  const [newsItems, setNewsItems] = useState(news);
  const searchParams = useSearchParams();
  const token = searchParams?.get("x-craft-live-preview");

  useEffect(() => {
    if (page !== 1) {
      getBlogs({
        language: locale,
        offset: (page - 1) * amount,
        amount,
        token,
      }).then(({ blogs }) => {
        setNewsItems((prevState) => [...prevState, ...blogs]);
      });
    }
  }, [page]);

  return (
    <div className="mt-16 space-y-10 lg:mt-20">
      {newsItems.map((post) => (
        <a href={post?.slug || ""} key={post.id} className="relative flex">
          <article className="relative isolate flex flex-col gap-8 lg:flex-row">
            <div className="relative lg:w-64">
              {post.image?.[0]?.url ? (
                <Image
                  alt=""
                  src={post.image?.[0]?.url}
                  width={post.image?.[0]?.width}
                  height={post.image?.[0]?.height}
                  className="rounded-2xl bg-gray-50 object-cover aspect-video"
                />
              ) : (
                <Image
                  alt=""
                  src={CompanyData.logo}
                  width={CompanyData.logo_width}
                  height={CompanyData.logo_height}
                  className="rounded-2xl bg-gray-50 object-contain px-2"
                />
              )}
            </div>

            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="group relative max-w-xl">
                  <Text
                    level="xl"
                    as="p"
                    classnames="font-semibold text-gray-900"
                  >
                    {post.title}
                  </Text>
                  <RichText
                    text={post.description}
                    className="mt-5 text-sm/6 text-gray-600 font-light"
                  />
                </div>
              </div>
            </div>
          </article>{" "}
        </a>
      ))}

      {newsItems.length < count && (
        <div className="w-full flex justify-center">
          <Button
            variant={"primary"}
            onClick={() => setPage((prevState) => prevState + 1)}
            callToAction={locale === "en" ? "Load more" : "Laad meer"}
          />
        </div>
      )}
    </div>
  );
};
