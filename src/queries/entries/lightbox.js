import { imageQuery } from "@/queries/entries/image";
import { buttonsQuery } from "@/queries/entries/buttons";

export const lightboxEntry = `
    ... on lightbox_Entry {
        typeHandle
        id
        backgroundColor
        title
        description
        images: image ${imageQuery}
    }
`;
