"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchData } from "@/utils/fetchData";
import { awardsQuery } from "@/queries/sections/awards";
import { Button, RichText } from "@/components/atoms";

const getAwards = ({ locale, offset, amount }) => {
  return fetchData(
    awardsQuery({ locale, visibility: "awardsPage", limit: amount, offset }),
  );
};

export const Awards = ({ defaultAwards, locale, amount, count }) => {
  const [page, setPage] = useState(1);
  const [awards, setAwards] = useState(defaultAwards);

  useEffect(() => {
    if (page !== 1) {
      getAwards({ locale, offset: (page - 1) * amount, amount }).then(
        ({ awards }) => {
          setAwards((prevState) => [...prevState, ...awards]);
        },
      );
    }
  }, [page]);

  return (
    <div className=" col-span-12 lg:col-span-10 space-y-10">
      <ul role="list" className=" space-y-12 divide-y divide-gray-200">
        {awards.map(({ image, title, description }, person) => (
          <li
            key={person.title}
            className="flex flex-col items-start gap-10 pt-12 lg:flex-row"
          >
            <Image
              src={image?.[0]?.url}
              alt={image?.[0]?.alt || ""}
              width={image?.[0]?.width}
              height={image?.[0]?.height}
              className={`min-w-40 w-40 object-contain mx-auto md:mx-0`}
            />

            <div className="">
              <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">
                {title}
              </h3>
              <RichText
                text={description}
                className="mt-6 text-gray-600 font-light"
              />
            </div>
          </li>
        ))}
      </ul>
      {awards.length < count && (
        <div className="w-full flex justify-center">
          <Button
            variant={"primary"}
            onClick={() => setPage((prevState) => prevState + 1)}
            callToAction={locale === "en" ? "Load more" : "Laad meer"}
          />
        </div>
      )}
    </div>
  );
};
