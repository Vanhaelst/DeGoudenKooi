import React from "react";
import { Container } from "@/components/atoms";
import { Cta } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import Image from "next/image";

export const CallToAction = (data) => {
  const bgColor = getBackgroundColor(data.backgroundColor);

  return (
    <section className={`relative ${bgColor} ${data.pullUp ? "" : "pt-24"}`}>
      <Image
        src="/scheur-footer-top.png"
        alt="scheur"
        width={1459}
        height={60}
        className="w-full absolute object-cover h-16 -top-10"
      />
      <Container classnames="">
        <Cta {...data} />
      </Container>
    </section>
  );
};
