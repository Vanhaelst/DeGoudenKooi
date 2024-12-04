import { Text } from "@/components/atoms";
import { BentoCard } from "@/components/molecules/bento/bento-card";
import Image from "next/image";

export const Bento = () => {
  return (
    <div>
      <Image
        src="/artwork-diamond.png"
        alt="diamond artwork"
        className="mb-2"
        width={45}
        height={45}
      />
      <Text as="h5" level="3xl" classnames="text-secondary-500">
        Ontdek alle Experiences
      </Text>
      <Text as="p" level="p" classnames="text-primary-700">
        Ons ruime aanbod aan escape experiences biedt voor ieder wat wils.
      </Text>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-12 lg:grid-rows-2">
        <div className="flex p-px lg:col-span-5">
          <BentoCard
            title="Ontdek alle escape games"
            description="Duik in spannende uitdagingen"
            image={{
              alt: "",
              url: "",
            }}
            button={{
              href: "#",
              variant: "primary-outline",
              callToAction: "Ontdek meer",
              size: "small",
            }}
          />
        </div>
        <div className="flex p-px lg:col-span-7">
          <BentoCard
            title="Ontdek alle escape experiences"
            description="Duik in spannende uitdagingen"
            image={{
              alt: "",
              url: "",
            }}
            button={{
              href: "#",
              variant: "primary-outline",
              callToAction: "Ontdek meer",
              size: "small",
            }}
          />
        </div>
        <div className="flex p-px lg:col-span-12">
          <BentoCard
            title="Ontdek alle escape walk experiences"
            description="Brengt de spanning van een escape room naar een avontuurlijke omgeving."
            backgroundImage={{
              alt: "",
              url: "",
            }}
            button={{
              href: "#",
              variant: "white-outline",
              callToAction: "Ontdek meer",
              size: "small",
            }}
          />
        </div>
      </div>
    </div>
  );
};
