import { Hero } from "@/components/organisms/hero/hero";
import { Container, Text } from "@/components/atoms";
import { MegaMenu, TopBar, Features } from "@/components/organisms";
import { Slider } from "@/components/molecules";
import { Bento } from "@/components/molecules/bento/bento";
import Image from "next/image";
import React from "react";
import { Testimonials } from "@/components/organisms/testimonials/testimonials";

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

export default function Home() {
  return (
    <div>
      <TopBar />
      <MegaMenu />

      <Hero
        type="horizontal"
        title="Ervaar De Meest Bekroonde Escape Experiences In Mechelen"
        buttons={[
          { href: "#", variant: "secondary", callToAction: "Boek nu" },
          {
            href: "#",
            variant: "secondary-outline",
            callToAction: "Secondary CTA",
          },
        ]}
        reviews={reviews}
      />

      <section>
        <Container classnames="py-20">
          <Slider
            settings={{
              slidesToShow: 8,
              speed: 9000,
              autoplay: true,
              infinite: true,
            }}
          >
            {awards.map(({ alt, url, width, height }) => (
              <div key={url} className="px-9">
                <Image
                  src={url}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-36 h-36 object-contain"
                />
              </div>
            ))}
          </Slider>
        </Container>
      </section>

      <section className="bg-[#F7F6F2]">
        <Container classnames="py-24 sm:py-32">
          <Bento />
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
            Onze awards
          </Text>
          <Text as="p" level="p" classnames="text-primary-700 text-center">
            We scoorde al reeds 50+ unieke awards!{" "}
          </Text>
        </Container>

        <div className="mb-24">
          <Slider
            settings={{
              arrows: true,
              slidesToShow: 5,
              autoplay: true,
              autoplaySpeed: 10000,
              speed: 5000,
              infinite: true,
              cssEase: "linear",
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

      <Features title="Waarom kiezen voor de gouden kooi" features={features} />

      <Testimonials
        title="Kies een kamer naar keuze"
        description="Bekroonde escape rooms met elk hun eigen verhaal"
        testimonials={games}
      />
    </div>
  );
}
