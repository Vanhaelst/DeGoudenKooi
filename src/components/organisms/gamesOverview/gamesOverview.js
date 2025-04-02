"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { Container } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { useSearchParams } from "next/navigation";

import gsap from "gsap";
import { fadeSlide } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Games } from "@/components/organisms/gamesOverview/games";
gsap.registerPlugin(ScrollTrigger);

export const GamesOverview = ({
  defaultRooms,
  title,
  description,
  t,
  locale,
}) => {
  const [rooms, setRooms] = useState([]);

  const searchParams = useSearchParams();
  const locationSearch = searchParams.get("location")?.toString();
  const typeSearch = searchParams.get("type")?.toString();

  const location = locationSearch ? `"${locationSearch}"` : undefined;
  const type = typeSearch ? `"${typeSearch}"` : undefined;

  useEffect(() => {
    setRooms([]);
    if (type || location) {
      fetchData(roomsQuery({ type, location, language: locale }))
        .then((res) => {
          setRooms(res.rooms);
        })
        .catch((e) => console.error(e));
    } else {
      setRooms(defaultRooms);
    }
  }, [defaultRooms, searchParams, location, type]);

  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      scrollTrigger: {
        trigger: elementRef.current,
      },
    });
  }, [rooms]);

  if (!rooms) return;

  return (
    <section className={`pb-24 sm:pb-32 min-h-[80vh] lg:-mt-52`}>
      <Container classnames="mb-10">
        <Title title={title} description={description} />
      </Container>

      {rooms.map((room, index) => {
        return (
          <Games
            key={room.title}
            {...room}
            index={index}
            t={t}
            locale={locale}
          />
        );
      })}
    </section>
  );
};
