import { Button, RichText, Text } from "@/components/atoms";
import Link from "next/link";

export const BentoCard = ({
  title,
  description,
  buttons,
  image,
  isBackgroundAsset,
}) => {
  if (isBackgroundAsset) {
    return (
      <div
        className="overflow-hidden bg-cover bg-center w-full ring-1 ring-white/15 rounded-2xl flex flex-col justify-between bg-secondary-500"
        style={{ backgroundImage: `url("${image?.[0].url}")` }}
      >
        <div className="p-7">
          {title && (
            <Text as="h5" level="lg" classnames="text-white">
              {title}
            </Text>
          )}
          {description && (
            <RichText text={description} classnames="text-white" />
          )}
        </div>

        <div className="p-7 mt-32 md:mt-0">
          {buttons &&
            buttons.map((button) => (
              <Button key={button.href} {...button} classnames="mt-4" />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white w-full flex flex-col justify-between ring-1 ring-white/15 rounded-2xl">
      <div className="p-7">
        {title && (
          <Text as="h5" level="lg" classnames="text-secondary-500">
            {title}
          </Text>
        )}
        {description && (
          <RichText text={description} classnames="text-primary-700" />
        )}
        {buttons &&
          buttons.map((button) => (
            <Button key={button.href} {...button} classnames="mt-4" />
          ))}
      </div>

      {image && (
        <img
          alt=""
          src={image?.[0].url}
          className="h-80 w-full object-cover object-left bg-primary-500 rounded-2xl"
        />
      )}
    </div>
  );
};
