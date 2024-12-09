import { RichText, Text } from "@/components/atoms";
import Image from "next/image";
import React from "react";

export const Feature = ({ title, description, icon }) => {
  return (
    <div>
      <div className="flex flex-row items-center">
        <Image
          src={icon?.url || "/artwork-diamond.png"}
          alt={icon?.alt || "diamond artwork"}
          className="w-10 h-10 mr-2"
          width={icon?.width || 45}
          height={icon?.height || 45}
        />
        {title && (
          <Text as="h5" level="xl" classnames="text-secondary-500">
            {title}
          </Text>
        )}
      </div>
      {description && (
        <RichText text={description} classnames="text-primary-700" />
      )}
    </div>
  );
};
