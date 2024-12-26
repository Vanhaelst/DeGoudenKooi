import { imageQuery } from "@/queries/entries/image";
import { buttonsQuery } from "@/queries/entries/buttons";

export const heroEntry = `
    ... on hero_Entry {
        typeHandle
        backgroundColor
        title
        description
        backgroundImage ${imageQuery}
        image ${imageQuery}
        heroType
        awardsStatus
        buttons ${buttonsQuery}
    }
`;
