import { imageQuery } from "@/queries/entries/image";
import { buttonsQuery } from "@/queries/entries/buttons";

export const heroEntry = `
    ... on hero_Entry {
        typeHandle
        title
        description
        image ${imageQuery}
        heroType
        awardsStatus
        buttons ${buttonsQuery}
    }
`;
