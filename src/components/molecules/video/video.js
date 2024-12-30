import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { Title } from "@/components/molecules";
import { Container } from "@/components/atoms";
import React from "react";

export const Video = ({
  title,
  description,
  backgroundColor,
  videoId,
  videoPlayer,
  halfBg,
}) => {
  const bgColor = getBackgroundColor(backgroundColor);

  if (!videoId) {
    return null;
  }

  return (
    <section className={`${bgColor & !halfBg ? bgColor : ""} relative py-14`}>
      <Container classnames="mb-24">
        <Title showIcon={true} title={title} description={description} />
      </Container>

      <Container classnames="aspect-video z-10">
        {videoPlayer === "vimeo" && (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?h=ab6adab836&badge=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="video"
            style={{ width: "100%", height: "100%" }}
            title="Dental Office Puurs"
          />
        )}

        {videoPlayer === "youtube" && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="video"
            style={{ width: "100%", height: "100%" }}
            title="Dental Office Puurs"
          />
        )}
      </Container>
      <div
        className={`${bgColor} h-[50%] w-full absolute bottom-0 left-0 z-0`}
      ></div>
    </section>
  );
};
