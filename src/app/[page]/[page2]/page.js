import React from "react";
import Image from "next/image";
import { Container, RichText, Text } from "@/components/atoms";
import { Cta, Slider, Bento } from "@/components/molecules";
import {
  Hero,
  Faq,
  Footer,
  Testimonials,
  MegaMenu,
  TopBar,
  Features,
} from "@/components/organisms";
import { HomeQuery } from "@/queries/sections/home";
import { fetchData } from "@/utils/fetchData";
import { faqQuery } from "@/queries/sections/faq";
import { awardsQuery } from "@/queries/sections/awards";
import { roomsQuery } from "@/queries/sections/rooms";
import { SeoQuery } from "@/queries/sections/seoPage";

async function getData() {
  return fetchData(SeoQuery({ url: "/seo1/seo2" }));
}

async function getAwards() {
  return fetchData(awardsQuery({ klasse: "" }));
}

export default async function Home() {
  const { page } = await getData();

  const { heroTitle, heroType, heroButtons, heroImage, awardsStatus } =
    page?.[0] || {};

  return (
    <div>
      <TopBar />
      <MegaMenu />

      <Hero
        type={heroType}
        title={heroTitle}
        buttons={heroButtons}
        image={heroImage?.[0]}
        // reviews={reviews}
        // showAwards={awardsStatus}
        // awards={awards}
      />

      <Footer />
    </div>
  );
}
