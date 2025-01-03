import { Hero } from "@/components/molecules/hero/hero";
import Script from "next/script";
import { CompanyData } from "@/data/companyData";
import { defaultMetadata } from "@/data/metadata";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import React from "react";
import { renderComponents } from "@/utils/renderComponents";
import { fetchData } from "@/utils/fetchData";
import { FixedPageQuery } from "@/queries/sections/fixedPage";

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Shop - De Gouden Kooi",
        description:
          "Shop ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Shop ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Cadeaubon - De Gouden Kooi",
        description:
          "Shop ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Een overzicht van de awards die we de voorbije jaren verzamelden.",
        },
      };
}

async function getPage({ language }) {
  return fetchData(FixedPageQuery({ page: "cadeaubonEntries", language }));
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });

  const {
    title,
    description,
    image,
    buttons,
    type,
    backgroundColor,
    backgroundImage,
    sections,
  } = page[0] ?? {};

  return (
    <>
      <Hero
        type={type}
        title={title}
        description={description}
        buttons={buttons}
        image={image}
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
      />

      <Bookeo type="giftcard" locale={params.locale} />

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
