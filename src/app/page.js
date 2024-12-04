import { Hero } from "@/components/organisms/hero/hero";
import { Container } from "@/components/atoms";
import { MegaMenu, TopBar } from "@/components/organisms";
import { LogoSlider } from "@/components/molecules";
import { Bento } from "@/components/molecules/bento/bento";

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
        reviews={[
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
        ]}
      />

      <section>
        <Container classnames="py-20">
          <LogoSlider
            slides={[
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
            ]}
          />
        </Container>
      </section>

      <section className="bg-[#F7F6F2]">
        <Container classnames="py-20">
          <Bento />
        </Container>
      </section>
    </div>
  );
}
