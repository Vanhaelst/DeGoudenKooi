"use client";

import { useEffect, useRef, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { fadeSlide, scrollTrigger } from "@/utils/gsap";
import Image from "next/image";

const people = [
  { id: 0, key: "", name: "Alle avonturen" },
  { id: 1, key: "game", name: "Escape Game" },
  { id: 2, key: "experience", name: "Escape Experience" },
  { id: 3, key: "walk", name: "Escape Walk Experience" },
];

export const Select = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selected, setSelected] = useState();

  const elementRef = useRef(null);

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

    if (term.key) {
      params.set("type", term.key);
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
    <div
      className="mx-auto flex justify-center items-center space-x-6 opacity-0"
      ref={elementRef}
    >
      <Image
        src="https://degoudenkooi.pluxit.be/web/assets/Algemene-Beelden/Details/zijkant_filter_links.png"
        alt=""
        width={92}
        height={17}
        className="object-contain relative"
      />
      <Listbox value={selected} onChange={handleSearch}>
        <div className="relative mt-2 max-w-80 w-80">
          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-none bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6">
            <span className="col-start-1 row-start-1 truncate pr-6 text-center">
              {selected?.name}
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-none bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {people.map((person) => (
              <ListboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary-500 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="block text-center truncate font-normal group-data-[selected]:font-semibold">
                  {person.name}
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      <Image
        src="https://degoudenkooi.pluxit.be/web/assets/Algemene-Beelden/Details/zijkant_filter_rechts.png"
        alt=""
        width={92}
        height={17}
        className="object-contain relative"
      />
    </div>
  );
};
