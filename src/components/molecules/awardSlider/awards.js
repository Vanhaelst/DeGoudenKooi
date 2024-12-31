import React from "react";
import Image from "next/image";
import { Container, Text } from "@/components/atoms";
import { Slider, Title } from "@/components/molecules";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { LINKS } from "@/enums/links";

export const AwardSlider = ({
  title,
  description,
  backgroundColor,
  awards,
  detail,
  locale,
}) => {
  const bgColor = getBackgroundColor(backgroundColor);

  if (!awards) {
    return null;
  }

  console.log(backgroundColor);
  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="pb-12 flex flex-col items-center">
        <Title title={title} description={description} />
      </Container>

      {/*<Slider
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
            dots: false,
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
        */}

      <Container>
        <div className="grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 rounded-2xl md:grid-cols-3">
          {awards?.map(({ image, title }) => {
            const { alt, url, width, height } = image?.[0];
            return (
              <div
                key={url}
                className={`relative group ${backgroundColor === "white" ? "bg-primary-500/10" : "bg-white/75"} p-8 sm:p-10 flex flex-col justify-center items-center h-30 transition-all`}
              >
                <Image
                  src={url}
                  alt={alt}
                  width={width}
                  height={height}
                  className="h-20 w-full object-contain transition-all pb-2"
                />
                <Text
                  as="h1"
                  level="lg"
                  classnames="absolute -bottom-5 text-center opacity-0 group-hover:bottom-2 group-hover:opacity-100 transition-all duration-300"
                >
                  {title}
                </Text>
              </div>
            );
          })}
        </div>

        {detail && (
          <div className="mt-16 flex justify-center">
            <p className="relative rounded-full bg-primary-500 px-4 py-1.5 text-sm/6 text-white hover:shadow-xl mb-2">
              <span className="hidden md:inline">
                Ontdek ze allemaal op onze
              </span>
              <a
                href={LINKS[locale.toUpperCase()].AWARDS}
                className="font-semibold text-white"
              >
                <span aria-hidden="true" className="absolute inset-0" /> awards
                pagina <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};
