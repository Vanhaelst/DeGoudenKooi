import React from "react";
import { fetchData } from "@/utils/fetchData";
import { awardsQuery } from "@/queries/sections/awards";
import { AwardSlider } from "@/components/molecules/awardSlider/awards";

async function getPage({ grade }) {
  return fetchData(awardsQuery({ grade }));
}

export const Awards = async ({
  title,
  description,
  backgroundColor,
  locale,
}) => {
  const { awards } = (await getPage({ grade: "" })) ?? undefined;

  if (!awards) {
    return null;
  }

  return (
    <AwardSlider
      title={title}
      description={description}
      backgroundColor={backgroundColor}
      awards={awards}
      locale={locale}
    />
  );
};
