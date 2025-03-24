import { imageQuery } from "@/queries/entries/image";

export const videoEntry = `
    ... on video_Entry {
        typeHandle
        backgroundColor
        title
        description
        videoPlayer
        videoType
        image ${imageQuery}
        videoId
    }
`;
