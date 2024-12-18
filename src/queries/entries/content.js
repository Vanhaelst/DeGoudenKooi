import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const contentEntry = `
    ... on contents_Entry {
        typeHandle
        backgroundColor
        contentItem {
            ... on text_Entry {
               typeHandle
                title
                description
                buttons ${buttonsQuery}
            }
            ... on contentImage_Entry {
               typeHandle
                title
                description
                buttons ${buttonsQuery}
                image ${imageQuery}
                order
            }
        }
    }
`;
