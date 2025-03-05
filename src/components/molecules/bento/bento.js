import { RichText, Text } from "@/components/atoms";
import { BentoCard } from "@/components/molecules/bento/bento-card";
import Image from "next/image";

export const Bento = ({ title, description, games }) => {
  const room = games?.[0];
  const experience = games?.[1];
  const walk = games?.[2];
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
        {title}
      </Text>
      <RichText text={description} classnames="text-primary-700 font-light" />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-12 lg:grid-rows-2">
        <div className="flex p-px lg:col-span-5">
          <BentoCard
            title={room?.title}
            description={room?.description}
            image={room?.image?.[0]}
            buttons={room?.buttons}
          />
        </div>
        <div className="flex p-px lg:col-span-7">
          <BentoCard
            title={experience?.title}
            description={experience?.description}
            image={experience?.image?.[0]}
            buttons={experience?.buttons}
          />
        </div>
        <div className="flex p-px lg:col-span-12">
          <BentoCard
            title={walk?.title}
            description={walk?.description}
            image={walk?.image?.[0]}
            buttons={walk?.buttons}
            isBackgroundAsset={walk?.isBackgroundAsset}
          />
        </div>
      </div>
    </div>
  );
};
