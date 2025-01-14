import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const contentImageEntry = `
    ... on contentImage_Entry {
        typeHandle
              id
        title
        description
        buttons ${buttonsQuery}
        image ${imageQuery}
        order
    }
`;
