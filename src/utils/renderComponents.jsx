import React from "react";

import { Grid } from "@/components/organisms/grid/grid";
import { GamesOverview } from "@/components/organisms/gamesOverview/gamesOverview";
import { Contents } from "@/components/organisms/content";
import { ContentImage } from "@/components/organisms/content/content-image";
import { Content } from "@/components/organisms/content/content";
import { Gallery } from "@/components/molecules/lightbox/lightbox";
import { Video } from "@/components/molecules/video/video";
import { Team } from "@/components/molecules/team/team";
import { Faq as FaqMolecule } from "@/components/molecules/faq/faq";
import { AsyncHero } from "@/components/organisms/hero/hero";
import { Awards } from "@/components/organisms/awards/awards";
import { Features } from "@/components/organisms/features/features";
import { CallToAction } from "@/components/organisms/callToAction/callToAction";
import { Testimonials } from "@/components/organisms/testimonials/testimonials";
import { Faq } from "@/components/organisms/faq/faq";

export const renderComponents = (data, locale) => {
  const { typeHandle } = data ?? {};

  switch (typeHandle) {
    case "hero":
      return <AsyncHero key={data.id} locale={locale} {...data} />;
    case "awards":
      return <Awards key={data.id} locale={locale} {...data} />;
    case "features":
      return <Features key={data.id} locale={locale} {...data} />;
    case "faqs":
      return <Faq key={data.id} locale={locale} {...data} />;
    case "callToAction":
      return <CallToAction key={data.id} locale={locale} {...data} />;
    case "contents":
      return <Contents key={data.id} locale={locale} {...data} />;
    case "roomSlider":
      return <Testimonials key={data.id} locale={locale} {...data} />;
    case "grid":
      return <Grid key={data.id} locale={locale} {...data} />;
    case "gamesOverview":
      return <GamesOverview key={data.id} locale={locale} {...data} />;
    case "contentImage":
      return <ContentImage key={data.id} locale={locale} {...data} />;
    case "text":
      return <Content key={data.id} locale={locale} {...data} />;
    case "lightbox":
      return <Gallery key={data.id} locale={locale} {...data} />;
    case "video":
      return <Video key={data.id} locale={locale} {...data} />;
    case "team":
      return <Team key={data.id} locale={locale} {...data} />;
    case "accordion":
      return <FaqMolecule key={data.id} locale={locale} {...data} />;
    default:
      return null;
  }
};
