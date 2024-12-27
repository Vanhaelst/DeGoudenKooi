import React from "react";
import { Footer, MegaMenu, TopBar } from "@/components/organisms";
import { fetchData } from "@/utils/fetchData";
import { SeoQuery } from "@/queries/sections/seoPage";
import { Hero } from "@/components/molecules/hero/hero";

async function getData() {
  return fetchData(SeoQuery({ url: "/seo1/seo2" }));
}

export default async function Home() {
  const { page } = await getData();

  const { heroTitle, heroType, heroButtons, heroImage, awardsStatus } =
    page?.[0] || {};

  return (
    <div>
      <TopBar />
      <MegaMenu />

      <p>SEO</p>
      <Hero
        type={heroType}
        title={heroTitle}
        buttons={heroButtons}
        image={heroImage?.[0]}
        awards={awardsStatus}
      />

      <Footer />
    </div>
  );
}
