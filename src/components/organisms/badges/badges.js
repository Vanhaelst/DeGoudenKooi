"use client";

import { Badge } from "@/components/organisms/badges/badge";
import { Container } from "@/components/atoms";
import { Select } from "@/components/organisms/badges/select";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { fade, scrollTrigger } from "@/utils/gsap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Badges = ({ defaultRooms, dict, filter }) => {
  const [rooms, setRooms] = useState([]);

  const searchParams = useSearchParams();
  const typeSearch = searchParams.get("type")?.toString();

  const type = typeSearch ? `"${typeSearch}"` : undefined;

  const elementLeftRef = useRef(null);
  const elementRightRef = useRef(null);

  useEffect(() => {
    if (rooms.length === 0) {
      gsap.fromTo(elementLeftRef.current, fade.from, {
        opacity: "0%",
        duration: 0.5,
        scrollTrigger: {
          trigger: elementLeftRef.current,
          ...scrollTrigger,
        },
      });
    } else {
      gsap.fromTo(elementLeftRef.current, fade.from, {
        ...fade.to,
        scrollTrigger: {
          trigger: elementLeftRef.current,
          ...scrollTrigger,
        },
      });
    }
  }, [type, rooms]);

  useEffect(() => {
    if (rooms.length === 0) {
      gsap.fromTo(elementLeftRef.current, fade.from, {
        opacity: "0%",
        duration: 0.5,
        scrollTrigger: {
          trigger: elementLeftRef.current,
          ...scrollTrigger,
        },
      });
    } else {
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
  }, [type, rooms]);

  useEffect(() => {
    setRooms([]);
    if (type) {
      fetchData(roomsQuery({ type }))
        .then((res) => {
          setRooms(res.rooms);
        })
        .catch((e) => console.log("error", e));
    } else {
      setTimeout(() => {
        setRooms(defaultRooms);
      }, 100);
    }
  }, [defaultRooms, searchParams, type]);

  if (!rooms) return;

  return (
    <div>
      <div className="badges w-full flex justify-center mt-12">
        <Image
          ref={elementLeftRef}
          src="https://degoudenkooi.pluxit.be/web/assets/Algemene-Beelden/Details/krul_links.png"
          alt=""
          width={77}
          height={40}
          className="object-contain relative -bottom-14 left-12 opacity-0"
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
          className="object-contain relative -top-14 right-12 opacity-0"
        />
      </div>
      {filter && (
        <Container classnames="pt-10">
          <Select />
        </Container>
      )}
    </div>
  );
};
