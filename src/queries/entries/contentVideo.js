import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const contentVideoEntry = `
    ... on contentVideo_Entry {
        typeHandle
        id
        title
        description
        buttons ${buttonsQuery}
        videoType
        videoPlayer
        image ${imageQuery}
        videoUrl
        order
    }
`;
