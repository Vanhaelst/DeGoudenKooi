"use client";

import Script from "next/script";
import { Container } from "@/components/atoms";

export const Code = ({ id, bgColor, code }) => {
  const { language, value } = code ?? {};
  console.log(language);

  return (
    <section className="">
      <Container classnames="">
        {language === "css" && <style jsx>{value}</style>}
        {language === "javascript" && <Script id={id}>{value}</Script>}
        {language === "html" && (
          <div
            id={`insert-${id}`}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </Container>
    </section>
  );
};
