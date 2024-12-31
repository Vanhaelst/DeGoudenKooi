"use client";

import React, { useState } from "react";
import { LOCALES } from "@/enums/locales";

export const LanguageSwitch = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="group relative z-50">
      <button
        className="text-sm text-white cursor-pointer flex w-full items-center justify-between border-b border-gray-100  py-2 pl-3 pr-4 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent"
        onClick={() => setShow((prevState) => !prevState)}
      >
        NL
        <svg
          className="ml-1 h-5 w-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={`bg-grey-200 z-50 divide-y divide-primary-500/50 rounded-lg overflow-hidden font-normal lg:absolute right-0 lg:bg-white lg:shadow lg:group-hover:block ${
          show ? "block" : "hidden"
        }`}
      >
        <a
          href={`/${LOCALES.DUTCH}`}
          className="block p-4 py-2 pl-3 pr-4 text-sm text-primary-500 cursor-pointer hover:bg-gray-100"
        >
          Nederlands
        </a>

        <a
          href={`/${LOCALES.ENGLISH}`}
          className="block p-4 py-2 pl-3 pr-4 text-sm text-primary-500 cursor-pointer hover:bg-gray-100"
        >
          English
        </a>
      </div>
    </div>
  );
};
