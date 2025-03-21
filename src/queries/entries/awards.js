import { imageQuery } from "@/queries/entries/image";

export const awardsEntry = `
    ... on awards_Entry {
        typeHandle
        id
        title
        description
        visibility
        backgroundColor
        backgroundImage ${imageQuery}
    }
`;
