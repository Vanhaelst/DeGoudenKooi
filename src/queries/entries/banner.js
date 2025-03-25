import { imageQuery } from "@/queries/entries/image";
import { buttonsQuery } from "@/queries/entries/buttons";

export const bannerEntry = `
    ... on banner_Entry {
        typeHandle
        id
        title
        description
        buttons ${buttonsQuery}
        backgroundImage ${imageQuery}
    }
`;
