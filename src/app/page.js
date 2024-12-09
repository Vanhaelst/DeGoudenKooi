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
const awards = [
  { alt: "Award", url: "/award1.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award2.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award3.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award4.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award5.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award1.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award2.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award3.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award4.webp", width: 536, height: 307 },
  { alt: "Award", url: "/award5.webp", width: 536, height: 307 },
];
const games = [
  {
    img: "/testimonials/tina-yards.jpg",
    award: "/testimonials/tina-yards.jpg",
    duration: "90 min",
    players: "4 - 8",
  },
  {
    img: "/testimonials/conor-neville.jpg",
    award: "/testimonials/conor-neville.jpg",
    duration: "90 min",
    players: "4 - 8",
  },
  {
    img: "/testimonials/amy-chase.jpg",
    duration: "90 min",
    players: "4 - 8",
  },
  {
    img: "/testimonials/veronica-winton.jpg",
    award: "/testimonials/veronica-winton.jpg",
    duration: "90 min",
    players: "4 - 8",
  },
  {
    img: "/testimonials/dillon-lenora.jpg",
    award: "/testimonials/dillon-lenora.jpg",
    duration: "90 min",
    players: "4 - 8",
  },
  {
    img: "/testimonials/harriet-arron.jpg",
    award: "/testimonials/harriet-arron.jpg",
    duration: "90 min",
    players: "4 - 8",
  },
];
const features = [
  {
    title: "Award winning",
    description:
      "Nationaal en internationaal geprezen, dé top escape rooms van België.",
  },
  {
    title: "Unieke angepaste planner",
    description: "Plan je bezoek eenvoudig en zonder stress.",
  },
  {
    title: "Vertrouwd door 200k+ spelers",
    description: "Duizenden beleefden al onze onvergetelijke avonturen.",
  },
  {
    title: "Award winning",
    description:
      "Nationaal en internationaal geprezen, dé top escape rooms van België.",
  },
  {
    title: "Unieke angepaste planner",
    description: "Plan je bezoek eenvoudig en zonder stress.",
  },
  {
    title: "Vertrouwd door 200k+ spelers",
    description: "Duizenden beleefden al onze onvergetelijke avonturen.",
  },
];
const faq = [
  { title: "Q1", description: "A1" },
  { title: "Q2", description: "A2" },
  { title: "Q3", description: "A3" },
  { title: "Q4", description: "A4" },
  { title: "Q5", description: "A5" },
  { title: "Q6", description: "A6" },
  { title: "Q7", description: "A7" },
  { title: "Q8", description: "A8" },
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

export default async function Home() {
  const { page } = await getData();

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

  // console.log(page);
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
            {awards.map(({ alt, url, width, height }) => (
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
            ))}
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
        testimonials={games}
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
