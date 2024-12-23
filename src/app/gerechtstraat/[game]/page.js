import React from "react";
import { Hero, Footer, MegaMenu, TopBar, Faq } from "@/components/organisms";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { ContentImage } from "@/components/organisms/content/content-image";
import { Bookeo } from "@/components/organisms/Bookeo/bookeo";
import { Prices } from "@/components/molecules/prices/prices";

async function getData() {
  return fetchData(roomsQuery({ url: "/seo1/seo2" }));
}

export default async function Home() {
  const { rooms } = await getData();

  console.log("rooms", rooms[0]);

  const {
    title,
    featuredImage,
    story,
    price2,
    price3,
    price4,
    price5,
    price6,
  } = rooms?.[0] || {};

  const prices = [
    { players: 2, price: price2 },
    { players: 3, price: price3 },
    { players: 4, price: price4 },
    { players: 5, price: price5 },
    { players: 6, price: price6 },
  ];

  return (
    <div>
      <TopBar />
      <MegaMenu />

      <Hero type="video" title={title} image={featuredImage} awards={true} />

      <div className={`py-24 sm:py-32`}>
        <ContentImage
          title="Het verhaal"
          description={story}
          image={featuredImage}
          order={false}
        />
      </div>

      <Prices title="Tarieven" prices={prices} />
      <Bookeo />

      <Faq categories={["featured"]} backgroundColor="lightGray" />
      <Footer />
    </div>
  );
}
