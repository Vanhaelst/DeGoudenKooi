"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { Container } from "@/components/atoms";
import { Title } from "@/components/molecules";
import { useSearchParams } from "next/navigation";
import { awardsQuery } from "@/queries/sections/awards";

import gsap from "gsap";
import { fadeSlide } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Games } from "@/components/organisms/gamesOverview/games";
gsap.registerPlugin(ScrollTrigger);

export const GamesOverview = ({ title, description, t }) => {
  const [rooms, setRooms] = useState([]);
  const [awards, setAwards] = useState([]);

  const searchParams = useSearchParams();
  const locationSearch = searchParams.get("location")?.toString();
  const typeSearch = searchParams.get("type")?.toString();

  const location = locationSearch ? `"${locationSearch}"` : undefined;
  const type = typeSearch ? `"${typeSearch}"` : undefined;

  useEffect(() => {
    fetchData(roomsQuery({ type, location }))
      .then((res) => {
        setRooms(res.rooms);
      })
      .catch((e) => console.log("error", e));

    fetchData(awardsQuery({}))
      .then((res) => {
        setAwards(res.awards);
      })
      .catch((e) => console.log("error", e));
  }, [searchParams, location, type]);

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
    <section className={`pb-24 sm:pb-32 min-h-[80vh]`}>
      <Container classnames="mb-10">
        <Title title={title} description={description} />
      </Container>

      {rooms.map((room, index) => {
        return (
          <Games
            key={room.title}
            {...room}
            awards={awards}
            index={index}
            t={t}
          />
        );
      })}
    </section>
  );
};
