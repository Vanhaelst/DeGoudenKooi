"use client";

import { Badge } from "@/components/organisms/badges/badge";
import { Container } from "@/components/atoms";
import { Select } from "@/components/organisms/badges/select";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { useSearchParams } from "next/navigation";

export const Badges = ({ defaultRooms, dict, filter }) => {
  const [rooms, setRooms] = useState([]);

  const searchParams = useSearchParams();
  const typeSearch = searchParams.get("type")?.toString();

  const type = typeSearch ? `"${typeSearch}"` : undefined;

  useEffect(() => {
    setRooms([]);
    if (type) {
      fetchData(roomsQuery({ type }))
        .then((res) => {
          setRooms(res.rooms);
        })
        .catch((e) => console.log("error", e));
    } else {
      setRooms(defaultRooms);
    }
  }, [defaultRooms, searchParams, type]);

  if (!rooms) return;

  return (
    <div>
      <div className="badges w-full flex justify-center mt-12">
        <div className="flex overflow-x-scroll hide-scrollbar px-10 min-h-44">
          {rooms?.map((room, index) => (
            <Badge
              key={room.title}
              searchParams={searchParams}
              dict={dict}
              index={index}
              length={rooms.length}
              {...room}
            />
          ))}
        </div>
      </div>
      {filter && (
        <Container classnames="pt-10">
          <Select />
        </Container>
      )}
    </div>
  );
};
