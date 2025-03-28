import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import Newsletter from "@/components/molecules/newsletter/newsletter";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { SeoQuery } from "@/queries/sections/seo";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";
import React from "react";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "contactEntries", language }));
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "contactEntries", language: params.locale }),
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

const faq = [
  {
    title: "DGK escape games - gerechtstraat",
    description:
      "<p>Er zijn verschillende parkeermogelijkheden in de buurt.\n" +
      "Gratis parkeren doe je op parking Douaneplein. Vandaar wandel je zo’n 20 minuten.\n" +
      "Goedkoop parkeren (max. €1 per uur in de week, gratis vanaf 20 uur en in het weekend) doe je op parking Zandpoortvest. Deze parkeertoren bevindt zich op zo’n 5 minuten wandelafstand.\n" +
      "Vlakbij (maar duurder) parkeren doe je in de ondergrondse parking Veemarkt. Vandaar is het zo’n 3 minuten wandelen.\n" +
      "Er zijn ook gratis shopping shuttles op bepaalde dagen die je naar het centrum van Mechelen brengen vanaf een gratis parking in de rand.</p>",
  },
  {
    title: "DGK escape Experiences - Haverwerf",
    description:
      "<p>Er zijn verschillende parkeermogelijkheden in de buurt.\n" +
      "Gratis parkeren doe je op parking Douaneplein. Vandaar wandel je zo’n 20 minuten.\n" +
      "Goedkoop parkeren (max. €1 per uur in de week, gratis vanaf 20 uur en in het weekend) doe je op parking Zandpoortvest. Deze parkeertoren bevindt zich op zo’n 5 minuten wandelafstand.\n" +
      "Vlakbij (maar duurder) parkeren doe je in de ondergrondse parking Veemarkt. Vandaar is het zo’n 3 minuten wandelen.\n" +
      "Er zijn ook gratis shopping shuttles op bepaalde dagen die je naar het centrum van Mechelen brengen vanaf een gratis parking in de rand.</p>",
  },
];
export default async function Contact({ params }) {
  const { page } = await getPage({ language: params.locale });
  const dict = await getDictionary(params.locale);

  const sections = page[0]?.sections;
  const transparentImage = page[0]?.transparentImage?.[0];

  return (
    <>
      <ImageWrapper image={transparentImage}>
        {sections?.map((section) => renderComponents(section, params.locale))}
      </ImageWrapper>

      <Newsletter locale={params.locale} t={dict} />
    </>
  );
}
