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
}) => {
  const bgColor = getBackgroundColor(backgroundColor);

  if (!videoId) {
    return null;
  }

  return (
    <section className={`${bgColor} py-24 sm:py-32`}>
      <Container classnames="mb-24">
        <Title title={title} description={description} />
      </Container>

      <Container classnames="aspect-video">
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
    </section>
  );
};
