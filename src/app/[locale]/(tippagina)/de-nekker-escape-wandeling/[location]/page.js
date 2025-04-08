import { defaultMetadata } from "@/data/metadata";
import { Container, RichText, Text } from "@/components/atoms";
import React from "react";
import { fetchData } from "@/utils/fetchData";
import { FixedPageQuery } from "@/queries/sections/fixedPage";
import { imageQuery } from "@/queries/entries/image";
import Image from "next/image";

export async function generateMetadata() {
  return {
    ...defaultMetadata,
    title: defaultMetadata.title,
    description: "",
    keywords: "",
    images: "",
    robots: "noindex",
  };
}

async function getPage({ language, location }) {
  console.log(location);
  return fetchData(`
    query MyQuery {
      tips: tipsEntries(language: "${language}", location: ${location}) {
        ... on tips_Entry {
          id
          title: question
          description: tip
          image ${imageQuery}
        }
      }
    }
  `);
}

export default async function Tips({ params }) {
  const { tips } = await getPage({
    language: params.locale,
    location: params.location.slice(8),
  });

  return (
    <main className="bg-[#b0d8f4] min-h-[50vh]">
      <Container classnames="py-10 md:py-20">
        <Text as="h5" level="3xl" classnames="text-black mb-4 font-bold">
          Extra tips voor je puzzel
        </Text>

        <RichText
          text="<p>Lukt het niet meteen om de puzzel op te lossen? Geen probleem! Klik eerst op ‘Tip 1’. Lukt het dan nog niet dan staat ‘Tip 2’ voor je klaar. Volledige black-out? Ga dan snel verder naar de volgende locatie. De tijd tikt! </p>"
          level="lg"
          classnames="text-black font-light mb-12"
        />

        <div className="divide-y ">
          {tips.map(({ title, description, image }) => {
            return (
              <div key={title} className="collapse collapse-plus">
                <input type="checkbox" name="my-accordion-3" />
                <div className="collapse-title px-0 pr-20">
                  <Text as="p" level="lg" classnames="font-semibold text-black">
                    {title}
                  </Text>
                </div>
                <div className="collapse-content px-0">
                  <RichText
                    text={description}
                    level="md"
                    classnames="text-black font-light"
                  />
                  {image[0]?.url && (
                    <Image
                      src={image[0].url}
                      alt={image[0].alt || title}
                      width={image[0].width}
                      height={image[0].height}
                      className="w-full rounded-2xl"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
