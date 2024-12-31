"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { usePathname } from "next/navigation";
import { imageQuery } from "@/queries/entries/image";
import { Hero } from "@/components/molecules/hero/hero";
import { contentEntry } from "@/queries/entries/content";
import { featuresEntry } from "@/queries/entries/features";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { lightboxEntry } from "@/queries/entries/lightbox";
import { videoEntry } from "@/queries/entries/video";
import { Loader } from "@/components/atoms/loader/loader";

const query = ({ pathname, language = "nl" }) => {
  return `
        query MyQuery {
              blog: blogsEntries(uri: "${pathname?.slice(4)}", language: "${language}") {
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

export default function News({ params }) {
  const [data, setData] = useState(undefined);
  const pathname = usePathname();

  useEffect(() => {
    fetchData(query({ pathname, language: params.locale })).then((res) => {
      setData(res?.blog[0]);
    });
  }, []);

  const { image, title, shortDescription, blogsections } = data || {};

  if (!data) {
    return <Loader />;
  }
  return (
    <>
      <Hero
        title={title}
        description={shortDescription}
        type="horizontal"
        image={image}
        awards={false}
      />

      {blogsections?.map((section) => renderComponents(section))}
    </>
  );
}
