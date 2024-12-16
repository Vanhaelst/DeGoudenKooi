import React from "react";
import {
  Awards,
  CallToAction,
  Faq,
  Features,
  Hero,
  Testimonials,
} from "@/components/organisms";
import { Grid } from "@/components/organisms/grid/grid";
import { GamesOverview } from "@/components/organisms/gamesOverview/gamesOverview";

/* TODO:
 *  - ContentImage
 *  - Grid
 *  - gameOverview
 * */
export const renderComponents = (data) => {
  const { typeHandle } = data ?? {};

  switch (typeHandle) {
    case "hero":
      return <Hero key={data.id} {...data} />;
    case "awards":
      return <Awards key={data.id} {...data} />;
    case "features":
      return <Features key={data.id} {...data} />;
    case "faqs":
      return <Faq key={data.id} {...data} />;
    case "callToAction":
      return <CallToAction key={data.id} {...data} />;
    case "ContentImage":
      return <Features key={data.id} {...data} />;
    case "roomSlider":
      return <Testimonials key={data.id} {...data} />;
    case "grid":
      return <Grid key={data.id} {...data} />;
    case "gamesOverview":
      return <GamesOverview key={data.id} {...data} />;
    default:
      return null;
  }
};
