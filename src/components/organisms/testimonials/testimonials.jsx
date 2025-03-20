import React from "react";

import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { Badges } from "@/components/organisms/badges/badges";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { Title } from "@/components/molecules";
import { Container } from "@/components/atoms";

async function getRooms({ language }) {
  return fetchData(roomsQuery({ language }));
}

export async function Testimonials({ locale }) {
  const { rooms } = await getRooms({ language: locale });
  const dict = await getDictionary(locale);

  return (
    <section className={`pb-24 sm:pb-32`}>
      <Container>
        <Title title={dict.general.discover_all} showIcon={false} />
      </Container>
      <Badges rooms={rooms} dict={dict} />
    </section>
  );
}
