"use client";

import { Badge } from "@/components/organisms/badges/badge";
import { Container } from "@/components/atoms";
import { Select } from "@/components/organisms/badges/select";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { fade, scrollTrigger } from "@/utils/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

gsap.registerPlugin(ScrollTrigger);

export const Badges = ({ defaultRooms, dict, filter, locale }) => {
  const [rooms, setRooms] = useState([]);

  const searchParams = useSearchParams();
  const typeSearch = searchParams.get("type")?.toString();

  const type = typeSearch ? `"${typeSearch}"` : undefined;

  const elementLeftRef = useRef(null);
  const elementRightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(elementLeftRef.current, fade.from, {
      opacity: "0%",
      duration: 0.5,
      scrollTrigger: {
        trigger: elementLeftRef.current,
        ...scrollTrigger,
      },
    });
    gsap.fromTo(elementRightRef.current, fade.from, {
      opacity: "0%",
      duration: 0.5,
      scrollTrigger: {
        trigger: elementRightRef.current,
        ...scrollTrigger,
      },
    });
  }, [type]);

  useEffect(() => {
    if (rooms.length > 0) {
      gsap.fromTo(elementLeftRef.current, fade.from, {
        ...fade.to,
        scrollTrigger: {
          trigger: elementLeftRef.current,
          ...scrollTrigger,
        },
      });

      const delay = type ? rooms?.length : defaultRooms.length;
      gsap.fromTo(elementRightRef.current, fade.from, {
        ...fade.to,
        delay: delay * 0.1,
        scrollTrigger: {
          trigger: elementRightRef.current,
          ...scrollTrigger,
        },
      });
    }
  }, [rooms]);

  useEffect(() => {
    setRooms([]);
    if (type) {
      fetchData(roomsQuery({ type, language: locale }))
        .then((res) => {
          setRooms(res.rooms);
        })
        .catch((e) => console.error(e));
    } else {
      setTimeout(() => {
        setRooms(defaultRooms);
      }, 100);
    }
  }, [defaultRooms, searchParams, type]);

  if (!rooms) return;

  return (
    <div>
      <div className="relative badges w-full flex justify-center mt-12">
        <Image
          ref={elementLeftRef}
          src="https://degoudenkooi.pluxit.be/web/assets/Algemene-Beelden/Details/krul_links.png"
          alt=""
          width={77}
          height={40}
          className="hidden xl:block object-contain relative -bottom-14 left-12 opacity-0"
        />
        <div className="flex overflow-x-scroll hide-scrollbar px-10 min-h-44">
          {rooms?.map((room, id) => (
            <Badge
              key={room.title}
              searchParams={searchParams}
              dict={dict}
              index={id}
              length={rooms.length}
              {...room}
            />
          ))}
        </div>
        <Image
          src="https://degoudenkooi.pluxit.be/web/assets/Algemene-Beelden/Details/Krul_rechts.png"
          alt=""
          ref={elementRightRef}
          width={77}
          height={40}
          className="hidden xl:block object-contain relative -top-14 right-12 opacity-0"
        />

        {rooms?.length > 2 ? (
          <ArrowLongRightIcon
            aria-hidden="true"
            className="absolute -bottom-6 right-10 pointer-events-none size-8 text-white md:hidden fill-primary-500"
          />
        ) : null}
      </div>
      {filter && (
        <Container classnames="pt-10">
          <Select t={dict} />
        </Container>
      )}
    </div>
  );
};
