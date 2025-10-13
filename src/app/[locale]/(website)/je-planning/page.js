import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { defaultMetadata } from "@/data/metadata";
import { Hero } from "@/components/molecules/hero/hero";
import React from "react";
import { Container } from "@/components/atoms";
import { FixedPageQuery } from "@/queries/sections/fixedPage";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";
import Image from "next/image";
import Planner from "@/components/molecules/planner";

async function getPage({ language, token }) {
  return fetchData(
    FixedPageQuery({ page: "planningEntries", language }),
    {},
    token,
  );
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

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });

  const {
    title,
    description,
    image,
    buttons,
    type,
    backgroundColor,
    backgroundImage,
    textColor,
    sections,
  } = page[0] ?? {};
  const transparentImage = page[0]?.transparentImage?.[0];

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
        textColor={textColor}
      />

      <section className="bg-white relative py-12 lg:py-24">
        <Container classnames="relative min-h-80 flex justify-center items-center">
          <Planner locale={params.locale} />
        </Container>
      </section>
      <Image
        src="/scheur-bottom.png"
        alt="scheur"
        width={1459}
        height={60}
        className="w-full"
      />

      <ImageWrapper image={transparentImage}>
        {sections?.map((section) => renderComponents(section, params.locale))}
      </ImageWrapper>
    </>
  );
}
