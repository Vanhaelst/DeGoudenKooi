import React from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { Hero } from "@/components/molecules/hero/hero";
import { CompanyData } from "@/data/companyData";
import { awardsQuery } from "@/queries/sections/awards";
import { Container, RichText } from "@/components/atoms";
import { defaultMetadata } from "@/data/metadata";
import { FixedPageQuery } from "@/queries/sections/fixedPage";
import { renderComponents } from "@/utils/renderComponents";

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Awards - De Gouden Kooi",
        description:
          "An overview of the awards we have collected over the past years.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "An overview of the awards we have collected over the past years.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Awards - De Gouden Kooi",
        description:
          "Een overzicht van de awards die we de voorbije jaren verzamelden.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Een overzicht van de awards die we de voorbije jaren verzamelden.",
        },
      };
}

async function getPage({ language }) {
  return fetchData(FixedPageQuery({ page: "planningEntries", language }));
}

const getAwards = () => {
  return fetchData(awardsQuery({}));
};

export default async function Home({ params }) {
  const { awards } = await getAwards({ language: params.locale });
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

      <section className="py-24 sm:py-32">
        <Container classnames="grid grid-cols-12 relative">
          <div className="col-span-1" />
          <ul
            role="list"
            className=" space-y-12 divide-y divide-gray-200 col-span-12 lg:col-span-10"
          >
            {awards.map(({ image, title, description }, person) => (
              <li
                key={person.title}
                className="flex flex-col items-start gap-10 pt-12 lg:flex-row"
              >
                <Image
                  src={image?.[0]?.url}
                  alt={image?.[0]?.alt}
                  width={image?.[0]?.width}
                  height={image?.[0]?.height}
                  className={`min-w-40 w-40 object-contain`}
                />

                <div className="">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
                    {title}
                  </h3>
                  <RichText text={description} className="mt-6 text-gray-600" />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {sections?.map((section) => renderComponents(section, params.locale))}
    </>
  );
}
