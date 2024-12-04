import { Button, Container, Text } from "@/components/atoms";

export const BentoCard = ({
  title,
  description,
  button,
  image,
  backgroundImage,
}) => {
  if (backgroundImage) {
    return (
      <div
        className="overflow-hidden bg-cover bg-center w-full ring-1 ring-white/15 rounded-2xl flex flex-col justify-between bg-secondary-500"
        style={{ backgroundImage: `url("${backgroundImage.url}")` }}
      >
        <div className="p-7">
          {title && (
            <Text as="h5" level="lg" classnames="text-white">
              {title}
            </Text>
          )}
          {description && (
            <Text as="p" level="sm" classnames="text-white">
              {description}
            </Text>
          )}
        </div>
        <div className="p-7">
          {button && <Button key={button.href} {...button} classnames="mt-4" />}
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
          <Text as="p" level="sm" classnames="text-primary-700">
            {description}
          </Text>
        )}
        {button && <Button key={button.href} {...button} classnames="mt-4" />}
      </div>
      {image && (
        <img
          alt=""
          src={image.url}
          className="h-80 w-full object-cover object-left bg-primary-500 rounded-2xl"
        />
      )}
    </div>
  );
};
