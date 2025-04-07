"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Container, Text } from "@/components/atoms";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const Select = ({ t }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selected, setSelected] = useState(
    searchParams.get("type")?.toString(),
  );

  const elementRef = useRef(null);

  const people = [
    { id: 0, key: "", name: t.general.adventures },
    { id: 1, key: "game", name: t.general.game },
    { id: 2, key: "experience", name: t.general.experience },
    { id: 3, key: "walk", name: t.general.walk },
  ];

  useEffect(() => {
    gsap.fromTo(elementRef.current, fadeSlide.from, {
      ...fadeSlide.to,
      scrollTrigger: {
        trigger: elementRef.current,
        ...scrollTrigger,
      },
    });
  }, []);

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    setSelected(term);

    if (term) {
      params.set("type", term);
    } else {
      params.delete("type");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const typeSearch = searchParams.get("type")?.toString();
    if (typeSearch) {
      const type = people.find((item) => item.key === typeSearch);
      setSelected(type);
    } else {
      setSelected(people[0]);
    }
  }, [searchParams]);

  return (
    <Container
      classnames="flex flex-col justify-center pb-4 sm:pt-10 opacity-0"
      forwardRef={elementRef}
    >
      <div className="relative mx-auto flex justify-center items-center space-x-6">
        <Image
          src="https://degoudenkooi.pluxit.be/web/assets/Algemene-Beelden/Details/zijkant_filter_links.png"
          alt=""
          width={92}
          height={17}
          className="object-contain relative"
        />
        <div className="relative">
          <select
            id="location"
            name="location"
            defaultValue={selected}
            onChange={(e) => handleSearch(e.target.value)}
            className="relative col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
          >
            {people.map((person) => (
              <option
                key={person.id}
                value={person.key}
                className="text-center"
              >
                {person.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="absolute right-0 top-2 pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
        <Image
          src="https://degoudenkooi.pluxit.be/web/assets/Algemene-Beelden/Details/zijkant_filter_rechts.png"
          alt=""
          width={92}
          height={17}
          className="object-contain relative"
        />
      </div>
      <Text
        as="p"
        level="xs"
        classnames="text-primary-500 text-center mt-4 font-light flex justify-center items-center"
      >
        <InformationCircleIcon
          aria-hidden="true"
          className="size-4 mr-2 flex-none"
        />{" "}
        {t.filter.information}{" "}
        <Link
          href={`nieuws/wat-is-het-verschil-tussen-een-escape-game-en-een-escape-experience`}
          className="ml-1 underline"
        >
          {t.filter.information_cta}
        </Link>
        .
      </Text>
    </Container>
  );
};
