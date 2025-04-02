import React from "react";
import { VideoDefault } from "@/components/molecules/video/video-default";
import ModalVideo from "@/components/molecules/video/modalVideo";
import { Container } from "@/components/atoms";

export const Video = (props) => {
  if (props.videoType === "modal" && props.type === "content") {
    return <ModalVideo {...props} thumb={props.image[0]} />;
  }
  if (props.videoType === "modal") {
    return (
      <Container>
        <ModalVideo {...props} thumb={props.image[0]} />
      </Container>
    );
  }

  return <VideoDefault {...props} />;
};
