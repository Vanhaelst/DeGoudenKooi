import { imageQuery } from "@/queries/entries/image";
import { buttonsQuery } from "@/queries/entries/buttons";

export const heroEntry = `
    ... on hero_Entry {
        typeHandle
        id
        backgroundColor
        title
        description
        textColor
        backgroundImage ${imageQuery}
        image ${imageQuery}
        type: heroType
        buttons ${buttonsQuery}
    }
`;
