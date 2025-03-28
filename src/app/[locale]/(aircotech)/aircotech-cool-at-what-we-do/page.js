import React from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

import { defaultMetadata } from "@/data/metadata";
import { Container, RichText, Text } from "@/components/atoms";
import nl from "./nl.json";
import en from "./en.json";
import { Form } from "@/app/[locale]/(aircotech)/aircotech-cool-at-what-we-do/form";

export const metadata = {
  ...defaultMetadata,
  robots: "noindex,nofollow",
};

export default async function Home({ params }) {
  console.log("params", params);
  const t = params.locale === "en" ? en : nl;
  return (
    <main>
      <section className="bg-gradient-to-b from-[#020093] from-20% to-90% to-transparent mb-10 md:mb-20">
        <Container classnames="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10 md:mb-20">
          <div>
            <Image
              src="/aircotech/aircotech-logo-wit.webp"
              width={1200}
              height={300}
              alt="aircotech"
              className="mb-8"
            />
            <Text as="h2" level="2xl" classnames="mb-4 text-white font-bold">
              {t.hero.title}
            </Text>
            <RichText
              classnames="mb-4 text-white"
              level="md"
              text={t.hero.description}
            />
            <Text as="p" level="md" classnames="mb-8 text-white">
              {t.hero.subtitle}
            </Text>

            <div className="flex flex-row justify-between">
              <div>
                <Text as="p" level="md" classnames=" text-white">
                  {t.hero.name}
                </Text>
                <Text as="p" level="md" classnames=" text-white">
                  {t.hero.function}
                </Text>
                <Text as="p" level="md" classnames=" text-white">
                  &quot;{t.hero.quote}&quot;
                </Text>
              </div>

              <Image
                src="/aircotech/michel.webp"
                width={253}
                height={300}
                alt="aircotech"
                className="w-32"
              />
            </div>

            <Link href="#contact">
              <button
                className={clsx(
                  "rounded-full px-6 py-3 uppercase font-semibold tracking-wide",
                  "bg-orange-500 text-white",
                  "hover:bg-orange-700 transition-all",
                )}
              >
                {t.hero.cta}
              </button>
            </Link>
          </div>
          <Image
            src="/aircotech/hvac.webp"
            width={1000}
            height={418}
            alt="aircotech"
            className=""
          />
        </Container>
        <Container classnames="mb-10 md:mb-20">
          <Text as="h1" level="3xl" classnames="text-white font-bold">
            {t.services.title}
          </Text>
          <Text as="p" level="md" classnames="text-white">
            {t.services.description}
          </Text>
        </Container>

        <Container classnames="grid grid-cols-1 md:grid-cols-2 gap-16">
          {t.services.services.map((service) => {
            return (
              <Link
                href="#contact"
                key={service.title}
                className="bg-white p-8 shadow-2xl hover:scale-110 transition-all cursor-pointer"
              >
                <Image
                  src={service.image[0].url}
                  alt={service.title}
                  width={service.image[0].width}
                  height={service.image[0].height}
                  className="aspect-[26/9] object-cover mb-4"
                />
                <Text
                  as="h1"
                  level="lg"
                  classnames="text-center mb-4 font-semibold text-[#cba442]"
                >
                  {service.title}
                </Text>
                <RichText
                  classnames="text-center mb-4"
                  level="sm"
                  text={service.description}
                />
                <div className="flex justify-center relative -bottom-12">
                  <button
                    className={clsx(
                      "rounded-full px-6 py-3 uppercase font-semibold tracking-wide",
                      service.color === "orange" &&
                        "bg-gradient-to-r from-[#ffb565] to-50% to-[#ff8e60] text-white",
                      service.color === "blue" &&
                        "bg-gradient-to-r from-[#45b2ff] to-[#0047d6] text-white",
                      service.color === "darkblue" &&
                        "bg-gradient-to-r from-[#3e5de8] to-[#19005e] text-white",
                      "hover:bg-orange-700 transition-all",
                    )}
                  >
                    {service.cta}
                  </button>
                </div>
              </Link>
            );
          })}
        </Container>
      </section>

      <section className="mb-10 md:mb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 shadow-2xl">
            <div className="bg-gradient-to-b from-[#45b2ff] to-[#0047d6] px-16 py-20 md:py-60">
              <Text as="h1" level="4xl" classnames="text-white mb-8 font-bold">
                {t.cta.title}
              </Text>
              <RichText
                as="p"
                level="md"
                classnames="text-white"
                text={t.cta.description}
              />
            </div>
            <div className="flex justify-center items-center">
              <Image
                src="/aircotech/ventilator.webp"
                width={1000}
                height={418}
                alt="ventilator"
                className=""
              />
            </div>
          </div>
        </Container>
      </section>
      <section className="mb-10 md:mb-20">
        <Container>
          <div className="bg-gradient-to-br from-[#ffb565] to-50% to-[#ff8e60] shadow-2xl p-10 md:p-32">
            <Text
              as="h1"
              level="3xl"
              classnames="text-white text-center mb-8 font-bold"
            >
              {t.testimonials.title}
            </Text>
            <div>
              {t.testimonials.testimonials.map((testimonial) => (
                <>
                  <Text
                    as="h1"
                    level="md"
                    classnames="text-white text-center mb-2 font-semibold"
                  >
                    {testimonial.name}
                  </Text>
                  <Text
                    as="h1"
                    level="md"
                    classnames="text-white text-center mb-4 font-semibold"
                  >
                    {testimonial.subtitle}
                  </Text>
                  <RichText
                    as="p"
                    level="md"
                    classnames="text-white text-center"
                    text={testimonial.quote}
                  />
                </>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section id="contact" className="mb-10 md:mb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="md:pt-20">
              <Text as="h2" level="3xl" classnames="mb-2 font-bold">
                {t.contact.title}
              </Text>
              <Text as="p" level="p" classnames="mb-8">
                {t.contact.subtitle}
              </Text>
            </div>

            <div className="bg-gradient-to-b from-[#45b2ff] to-[#0047d6] px-16 py-10">
              <Form t={t.contact} />
            </div>
          </div>
        </Container>
      </section>

      <footer className="pb-4">
        <Container classnames="flex justify-between items-center">
          <Text as="p" level="sm" classnames="hover:underline">
            Clint D’Hoogh Website Design
          </Text>
          {params.locale === "nl" ? (
            <Link href="/en/aircotech">
              <Image
                src="/aircotech/engels.webp"
                alt="engles"
                width={512}
                height={512}
                className="aspect-square w-10"
              />
            </Link>
          ) : (
            <Link href="/nl/aircotech-cool-at-what-we-do">
              <Image
                src="/aircotech/nederlands.webp"
                alt="engles"
                width={512}
                height={512}
                className="aspect-square w-10"
              />
            </Link>
          )}
        </Container>
      </footer>
    </main>
  );
}
