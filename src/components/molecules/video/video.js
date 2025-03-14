import React from "react";
import { Container } from "@/components/atoms";

export const Video = ({ videoId, videoPlayer, halfBg, id }) => {
  const bgColor = ""; //getBackgroundColor(backgroundColor);

  if (!videoId) {
    return null;
  }

  return (
    <section
      className={`${bgColor & !halfBg ? bgColor : ""} relative py-14`}
      id={id}
    >
      <Container classnames="aspect-video z-10">
        {videoPlayer === "vimeo" && (
          <iframe
            src=${videoId}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="video"
            style={{ width: "100%", height: "100%" }}
            title="De Gouden Kooi"
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
