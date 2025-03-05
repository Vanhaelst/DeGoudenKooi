import React from "react";
import { Hero } from "@/components/molecules/hero/hero";

export const AsyncHero = async (props) => {
  return <Hero {...props} />;
};
