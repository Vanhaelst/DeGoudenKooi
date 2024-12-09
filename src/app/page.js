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
import { awardsQuery } from "@/queries/entries/awards";
import { roomsQuery } from "@/queries/sections/rooms";

const reviews = [
  {
    title: "Geweldig",
    description: "Supertoffe experience",
    avatar: { alt: "Jasper", src: "" },
  },
  {
    title: "Een echte aanrader!",
    description: "Voor elke leeftijd wat wils",
    avatar: { alt: "Jasper", src: "" },
  },
  {
    title: "Geweldig",
    description: "Supertoffe experience",
    avatar: { alt: "Jasper", src: "" },
  },
  {
    title: "Een echte aanrader!",
    description: "Voor elke leeftijd wat wils",
    avatar: { alt: "Jasper", src: "" },
  },
];
const cta = {
  title: "Ervaar De Meest Bekroonde Escape Experiences In Mechelen",
  pullUp: true,
  buttons: [
    { href: "#", variant: "white", callToAction: "Boek nu" },
    {
      href: "#",
      variant: "white-outline",
      callToAction: "Secondary CTA",
    },
  ],
  backgroundImage: "/bird.png",
};

async function getData() {
  return fetchData(HomeQuery());
}

async function getFaq() {
  return fetchData(faqQuery({ categories: ["featured"] }));
}

async function getAwards() {
  return fetchData(awardsQuery({ klasse: "" }));
}

async function getRooms() {
  return fetchData(roomsQuery({ type: "" }));
}

export default async function Home() {
  const { page } = await getData();
  const { faq } = await getFaq();
  const { awards } = await getAwards();
  const { rooms } = await getRooms();

  const {
    heroTitle,
    heroType,
    heroButtons,
    heroImage,
    awardsStatus,

    bentoTitle,
    bentoDescription,
    games,

    awardsTitle,
    awardsDescription,

    featuresTitle,
    featuresDescription,
    features,

    gamesTitle,
    gamesDescription,

    faqTitle,
    faqDescription,
  } = page?.[0] || {};

  return (
    <div>
      <TopBar />
      <MegaMenu />

      <Hero
        type={heroType}
        title={heroTitle}
        buttons={heroButtons}
        image={heroImage[0]}
        // reviews={reviews}
        showAwards={awardsStatus}
        awards={awards}
      />

      <section className="bg-[#F7F6F2]">
        <Container classnames="py-24 sm:py-32">
          <Bento
            title={bentoTitle}
            description={bentoDescription}
            games={games}
          />
        </Container>
      </section>

      <section className="bg-white">
        <Container classnames="py-24 sm:py-32 flex flex-col items-center">
          <Image
            src="/artwork-diamond.png"
            alt="diamond artwork"
            className="mb-2"
            width={45}
            height={45}
          />
          <div className="flex">
            <Image
              src="/star-full.svg"
              alt="star"
              className=""
              width={18}
              height={16}
            />
            <Image
              src="/star-full.svg"
              alt="star"
              className=""
              width={18}
              height={16}
            />
            <Image
              src="/star-full.svg"
              alt="star"
              className=""
              width={18}
              height={16}
            />
            <Image
              src="/star-full.svg"
              alt="star"
              className=""
              width={18}
              height={16}
            />
            <Image
              src="/star-half.svg"
              alt="star"
              className=""
              width={18}
              height={16}
            />
          </div>
          <Text as="h5" level="3xl" classnames="text-secondary-500 text-center">
            {awardsTitle}
          </Text>
          <RichText
            text={awardsDescription}
            classnames="text-primary-700 text-center"
          />
        </Container>

        <div className="mb-24">
          <Slider
            settings={{
              arrows: true,
              slidesToShow: 5,
              autoplay: false,
              autoplaySpeed: 10000,
              speed: 5000,
              infinite: true,
              cssEase: "linear",
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
          >
            {awards?.map(({ image }) => {
              const { alt, url, width, height } = image?.[0];
              return (
                <div key={url} className="px-2">
                  <div
                    key={url}
                    className="px-6 py-2 bg-[#F7F6F2] flex justify-center items-center rounded-2xl"
                  >
                    <Image
                      src={url}
                      alt={alt}
                      width={width}
                      height={height}
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>

      <Features
        title={featuresTitle}
        description={featuresDescription}
        features={features}
      />

      <Testimonials
        title={gamesTitle}
        description={gamesDescription}
        testimonials={rooms}
      />

      <Faq title={faqTitle} description={faqDescription} faq={faq} />

      <section className="bg-secondary-700">
        <Container classnames="">
          <Cta {...cta} />
        </Container>
      </section>

      <Footer />
    </div>
  );
}
