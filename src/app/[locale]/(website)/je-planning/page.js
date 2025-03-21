import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { defaultMetadata } from "@/data/metadata";
import { Hero } from "@/components/molecules/hero/hero";
import React from "react";
import { Container } from "@/components/atoms";
import { FixedPageQuery } from "@/queries/sections/fixedPage";

async function getPage({ language }) {
  return fetchData(FixedPageQuery({ page: "planningEntries", language }));
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Plan your escape - De Gouden Kooi",
        description:
          "Plan ✓ Escape Experiences ✓ Escape Walks ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Plan ✓ Escape Experiences ✓ Escape Walks ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Plan je Escape - De Gouden Kooi",
        description:
          "Plan escape game ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Plan escape game ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
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

      <section className="bg-white relative py-12 lg:py-24">
        <Container classnames="min-h-80 flex justify-center items-center">
          <iframe
            src="https://app.plan2book.be/planner?tenant=f4J1eLI23IFoXyCh2ACV&lang=nl"
            style={{
              width: "100%",
              minWidth: "100%",
              border: "0px",
              minHeight: "630px",
              height: "630px",
            }}
          />
        </Container>
      </section>

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
