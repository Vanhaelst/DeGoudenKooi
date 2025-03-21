import { defaultMetadata } from "@/data/metadata";
import Image from "next/image";
import { Container, RichText, Text } from "@/components/atoms";
import { Accordion, Title } from "@/components/molecules";
import React from "react";

export async function generateMetadata({ params }) {
  return {
    ...defaultMetadata,
    title: defaultMetadata.title,
    description: "",
    keywords: "",
    images: "",
    robots: "noindex",
  };
}

const faq = [
  {
    title: "Tip 1",
    description:
      "<p>Kan je aan de hand van de richting en de locatie van de voetsporen het pad achterhalen dat de moordenaar gelopen heeft?\n" +
      "\n</p>",
  },
  {
    title: "Tip 2",
    description:
      "<p>Kan je aan de hand van de richting en de locatie van de voetsporen het pad achterhalen dat de moordenaar gelopen heeft?\n" +
      "\n</p>",
  },
  {
    title: "Tip 3",
    description:
      "<p>Kan je aan de hand van de richting en de locatie van de voetsporen het pad achterhalen dat de moordenaar gelopen heeft?\n" +
      "\n</p>",
  },
];
export default async function Home({ params }) {
  return (
    <main className="bg-[#b0d8f4]">
      <Container classnames="py-10 md:py-20">
        <Text as="h5" level="3xl" classnames="text-black mb-4 font-bold">
          Extra tips voor je puzzel
        </Text>

        <RichText
          text="<p>Lukt het niet meteen om de puzzel op te lossen? Geen probleem! Klik eerst op ‘Tip 1’. Lukt het dan nog niet dan staat ‘Tip 2’ voor je klaar. Volledige black-out? Ga dan snel verder naar de volgende locatie. De tijd tikt! </p>"
          level="lg"
          classnames="text-black font-light"
        />

        <div className="divide-y ">
          {faq.map(({ title, description }) => {
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
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
