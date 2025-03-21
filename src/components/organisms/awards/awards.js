import React from "react";
import { fetchData } from "@/utils/fetchData";
import { awardsQuery } from "@/queries/sections/awards";
import { AwardSlider } from "@/components/molecules/awardSlider/awards";

async function getPage({ visibility, locale }) {
  return fetchData(awardsQuery({ visibility, locale }));
}

export const Awards = async ({
  title,
  description,
  backgroundColor,
  backgroundImage,
  locale,
  slider,
  visibility,
}) => {
  const { awards } = (await getPage({ visibility, locale })) ?? undefined;

  if (!awards) {
    return null;
  }

  return (
    <AwardSlider
      title={title}
      description={description}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      awards={awards}
      locale={locale}
      slider={slider}
      visibility={visibility}
    />
  );
};
