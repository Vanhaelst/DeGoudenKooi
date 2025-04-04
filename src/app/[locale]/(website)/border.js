import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./globals.css";
import "../../slick.css";
import React from "react";
import Image from "next/image";

export const Borders = () => {
  return (
    <div className="border-wrapper fixed bottom-0 pointer-events-none w-full z-40">
      <Image
        className="absolute right-2 top-2 w-14 md:w-24"
        src="/border-top-right.png"
        alt="border-top-right.png"
        width={92}
        height={92}
      />
      <div className="border md:border-2 absolute border-primary-500 w-[calc(100%_-_1rem_-_65px)] md:w-[calc(100%_-_1rem_-_92px)] border-top left-2 top-2" />
      <div className="border md:border-2 absolute border-primary-500 w-[calc(100%_-_1rem_-_65px)] md:w-[calc(100%_-_1rem_-_92px)] border-bottom right-2 bottom-2" />
      <div className="border md:border-2 absolute border-primary-500 h-[calc(100%_-_1rem_-_65px)] md:h-[calc(100%_-_1rem_-_92px)] border-left left-2 top-2" />
      <div className="border md:border-2 absolute border-primary-500 h-[calc(100%_-_1rem_-_65px)] md:h-[calc(100%_-_1rem_-_92px)] border-right right-2 bottom-2" />
      <Image
        className="absolute bottom-2 left-2 w-14 md:w-24"
        src="/border-bottom-left.png"
        alt="border-bottom-left.png"
        width={92}
        height={92}
      />
    </div>
  );
};
