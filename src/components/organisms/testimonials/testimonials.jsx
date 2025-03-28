import React from "react";

import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { Badges } from "@/components/organisms/badges/badges";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { Container, Text } from "@/components/atoms";

async function getRooms({ language }) {
  return fetchData(roomsQuery({ language }));
}

export async function Testimonials({ locale, title, backgroundImage }) {
  const { rooms } = await getRooms({ language: locale });
  const dict = await getDictionary(locale);

  const badgesBackground = backgroundImage?.[0]?.url;

  return (
    <section
      className={`pt-10 pb-24 sm:pb-32 bg-top bg-cover`}
      style={{
        backgroundImage: `url('${badgesBackground}')`,
      }}
    >
      <Container>
        {title && (
          <Text as="h5" level="3xl" classnames="text-white mb-4 font-bold">
            {title}
          </Text>
        )}
      </Container>
      <Badges defaultRooms={rooms} dict={dict} />
    </section>
  );
}
