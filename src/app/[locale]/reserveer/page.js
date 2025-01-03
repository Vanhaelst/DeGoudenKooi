import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { defaultMetadata } from "@/data/metadata";
import { Hero } from "@/components/molecules/hero/hero";
import React from "react";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import { FixedPageQuery } from "@/queries/sections/fixedPage";

async function getPage({ language }) {
  return fetchData(FixedPageQuery({ page: "reserveEntries", language }));
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Reserve your escape - De Gouden Kooi",
        description:
          "Reserve ✓ Escape Experiences ✓ Escape Walks ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Reserve ✓ Escape Experiences ✓ Escape Walks ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Boek je Escape - De Gouden Kooi",
        description:
          "Boeking escape game ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Boeking escape game ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
        },
      };
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

      <Bookeo locale={params.locale} variant={""} />
      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
