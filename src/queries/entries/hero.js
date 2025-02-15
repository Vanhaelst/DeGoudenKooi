import { imageQuery } from "@/queries/entries/image";
import { buttonsQuery } from "@/queries/entries/buttons";

export const heroEntry = `
    ... on hero_Entry {
        typeHandle
              id
        backgroundColor
        title
        description
        backgroundImage ${imageQuery}
        image ${imageQuery}
        type: heroType
        buttons ${buttonsQuery}
    }
`;
