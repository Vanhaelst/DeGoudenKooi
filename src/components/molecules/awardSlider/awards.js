import React from "react";
import Image from "next/image";
import { Container, Text } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { LINKS } from "@/enums/links";

import nl from "@/app/[locale]/dictionaries/nl.json";
import en from "@/app/[locale]/dictionaries/en.json";

export const AwardSlider = ({
  title,
  description,
  backgroundColor,
  awards,
  detail,
  locale = "nl",
  t,
}) => {
  const bgColor = getBackgroundColor(backgroundColor);

  if (!awards) {
    return null;
  }

  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="pb-12 flex flex-col items-center">
        <Title title={title} description={description} />
      </Container>

      <Container>
        <div className="grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 rounded-2xl md:grid-cols-3">
          {awards?.map(({ image, title }) => {
            const { alt, url, width, height } = image?.[0];
            return (
              <a
                href={LINKS[locale.toUpperCase()].AWARDS}
                key={url}
                className={`relative group ${backgroundColor === "white" ? "bg-primary-500/10" : "bg-white/75"} p-8 sm:p-10 flex flex-col justify-center items-center h-30 transition-all`}
              >
                <Image
                  src={url}
                  alt={alt}
                  width={width}
                  height={height}
                  className="h-20 w-full object-contain transition-all pb-2"
                />
                <Text
                  as="h1"
                  level="lg"
                  classnames="absolute -bottom-5 text-center opacity-0 group-hover:bottom-2 group-hover:opacity-100 transition-all duration-300"
                >
                  {title}
                </Text>
              </a>
            );
          })}
        </div>

        {detail && (
          <div className="mt-16 flex justify-center">
            <p className="relative rounded-full bg-primary-500 px-4 py-1.5 text-sm/6 text-white hover:shadow-xl mb-2">
              <span className="hidden md:inline mr-1">{t.awards_link}</span>
              <a
                href={LINKS[locale.toUpperCase()].AWARDS}
                className="font-semibold text-white"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {t.awards_link_bold}
                <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span>
              </a>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};
