import React from "react";
import { fetchData } from "@/utils/fetchData";
import { awardsQuery } from "@/queries/sections/awards";
import { Hero } from "@/components/molecules/hero/hero";

async function getPage({ grade }) {
  return fetchData(awardsQuery({ grade }));
}

export const AsyncHero = async (props) => {
  const { awards } = (await getPage({})) ?? undefined;

  return <Hero {...props} awards={awards} />;
};
