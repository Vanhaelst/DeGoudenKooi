import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const callToActionEntry = `
    ... on callToAction_Entry {
        typeHandle
        id
        title
        description
        buttons ${buttonsQuery}
        image ${imageQuery}
        backgroundImage ${imageQuery}
        textColor
        pullUp
        backgroundColor
    }
`;
