import React from "react";
import Image from "next/image";
import { Container } from "@/components/atoms";
import { Slider, Title } from "@/components/molecules";
import { fetchData } from "@/utils/fetchData";
import { awardsQuery } from "@/queries/sections/awards";

async function getPage({ grade }) {
  return fetchData(awardsQuery({ grade }));
}

export const Awards = async ({ title, description, grade }) => {
  const { awards } = (await getPage({ grade })) ?? undefined;

  if (!awards) {
    return null;
  }

  return (
    <section className="bg-white">
      <Container classnames="py-24 sm:py-32 flex flex-col items-center">
        <Title title={title} description={description} />
      </Container>

      <div className="mb-24">
        <Slider
          settings={{
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 10000,
            pauseOnHover: false,
            cssEase: "linear",
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            arrows: false,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                },
              },
            ],
          }}
        >
          {awards?.map(({ image }) => {
            const { alt, url, width, height } = image?.[0];
            return (
              <div key={url} className="px-2">
                <div
                  key={url}
                  className="px-6 py-2 bg-[#F7F6F2] flex justify-center items-center rounded-2xl"
                >
                  <Image
                    src={url}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-36 h-36 object-contain"
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};
