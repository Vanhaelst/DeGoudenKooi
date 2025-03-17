import { buttonsQuery } from "@/queries/entries/buttons";

export const callToActionEntry = `
    ... on callToAction_Entry {
        typeHandle
        id
        title
        description
        buttons ${buttonsQuery}
        pullUp
        backgroundColor
    }
`;
