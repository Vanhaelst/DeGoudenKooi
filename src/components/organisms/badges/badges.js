"use client";

import { Badge } from "@/components/organisms/badges/badge";
import { Container, Text } from "@/components/atoms";
import { Select } from "@/components/organisms/badges/select";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { fade, scrollTrigger } from "@/utils/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

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
        <div
          className={clsx(
            "flex overflow-x-scroll hide-scrollbar px-10 min-h-44",
            "overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]",
          )}
        >
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
      </div>
      {filter && (
        <Container classnames="flex flex-col justify-center pb-4">
          <Select t={dict} />
          <Text
            as="p"
            level="xs"
            classnames="text-white text-center mt-4 font-light flex justify-center items-center"
          >
            <InformationCircleIcon
              aria-hidden="true"
              className="size-4 mr-2 flex-none"
            />{" "}
            Meer weten over de verschillen? Check onze blog.
          </Text>
        </Container>
      )}
    </div>
  );
};
