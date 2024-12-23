import Image from "next/image";
import { RichText, Text } from "@/components/atoms";

export const Title = ({ title, description, showIcon = true }) => {
  if (!title && !description) {
    return null;
  }

  return (
    <>
      {showIcon && (
        <Image
          src="/artwork-diamond.png"
          alt="diamond artwork"
          className="mb-2"
          width={45}
          height={45}
        />
      )}
      <Text as="h5" level="3xl" classnames="text-secondary-500">
        {title}
      </Text>
      <RichText text={description} classnames="text-primary-700" />
    </>
  );
};
