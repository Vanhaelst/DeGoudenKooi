import Image from "next/image";
import { RichText, Text } from "@/components/atoms";

export const Title = ({ title, subtitle, description, showIcon = true }) => {
  if (!title && !description) {
    return null;
  }

  return (
    <>
      {showIcon && (
        <Image
          src="/symbool.png"
          alt="diamond artwork"
          className="mb-2 w-16 h-16"
          width={45}
          height={45}
        />
      )}
      <Text as="h5" level="3xl" classnames="text-secondary-500 mb-4">
        {title}
      </Text>
      <Text as="h6" level="xl" classnames="text-secondary-500 mb-4">
        {subtitle}
      </Text>
      <RichText text={description} classnames="text-primary-700" />
    </>
  );
};
