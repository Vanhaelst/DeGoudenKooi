import { Container, Text } from "@/components/atoms";
import React from "react";
import { Feature, Title } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import Image from "next/image";

export const TeamMember = ({ name, image, role, position }) => {
  const foo = image?.[0];
  return (
    <li key={name} className="list-none flex flex-col items-center space-y-5">
      <Image
        alt={name}
        src={foo.url}
        width={foo.width}
        height={foo.height}
        className="mx-auto w-40 rounded-full"
      />
      <div className="flex flex-col items-center">
        <Text as="h4" level="lg" classnames="text-primary-500">
          {name}
        </Text>
        <Text
          as="p"
          level="sm"
          classnames="text-secondary-500/50 mb-3 text-center"
        >
          {role}
        </Text>
        <Text as="p" level="sm" classnames="text-secondary-500">
          {position}
        </Text>
      </div>
    </li>
  );
};
