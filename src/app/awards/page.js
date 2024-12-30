import React from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { Hero } from "@/components/molecules/hero/hero";
import { CompanyData } from "@/data/companyData";
import { awardsQuery } from "@/queries/sections/awards";
import { Container, RichText, Text } from "@/components/atoms";

export const metadata = {
  title: "Awards - De Gouden Kooi",
  description:
    "Een overzicht van de awards die we de voorbije jaren verzamelden.",
  // keywords: "",
};

const getAwards = () => {
  return fetchData(awardsQuery({}));
};

export default async function Home() {
  const { awards } = await getAwards();

  return (
    <>
      <Hero
        type="vertical"
        title="Awards"
        backgroundImage={[{ url: CompanyData.heroBg }]}
        description="<p>Doorheen de jaren hebben we bij De Gouden Kooi al best veel fijne erkenning gekregen voor ons werk. Soms vertaalt zich dat in een award. Onderstaand vind je een overzicht van onze verkregen awards doorheen de jaren.</p>"
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
    </>
  );
}
