import { Button, Container, Text } from "@/components/atoms";
import { BentoCard } from "@/components/molecules/bento/bento-card";

export const Bento = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <Text as="h5" level="3xl" classnames="text-secondary-500">
          Ontdek alle Experiences
        </Text>
        <Text as="p" level="p" classnames="text-primary-700">
          Ons ruime aanbod aan escape experiences biedt voor ieder wat wils.
        </Text>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="flex p-px lg:col-span-4">
            <BentoCard
              title="Ontdek alle escape games"
              description="Duik in spannende uitdagingen"
              image={{
                alt: "",
                url: "https://tailwindui.com/plus/img/component-images/bento-02-releases.png",
              }}
              button={{
                href: "#",
                variant: "primary-outline",
                callToAction: "Ontdek meer",
                size: "small",
              }}
            />
          </div>
          <div className="flex p-px lg:col-span-2">
            <BentoCard
              title="Ontdek alle escape experiences"
              description="Duik in spannende uitdagingen"
              image={{
                alt: "",
                url: "https://tailwindui.com/plus/img/component-images/bento-02-integrations.png",
              }}
              button={{
                href: "#",
                variant: "primary-outline",
                callToAction: "Ontdek meer",
                size: "small",
              }}
            />
          </div>
          <div className="flex p-px lg:col-span-6">
            <BentoCard
              title="Ontdek alle escape walk experiences"
              description="Brengt de spanning van een escape room naar een avontuurlijke omgeving."
              backgroundImage={{
                alt: "",
                url: "https://tailwindui.com/plus/img/component-images/bento-02-security.png",
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
    </div>
  );
};
