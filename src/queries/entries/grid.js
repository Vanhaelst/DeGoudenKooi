import { imageQuery } from "@/queries/entries/image";

export const gridEntry = `
    ... on grid_Entry {
        typeHandle
        title
        id
        description
        backgroundColor
        gridItems {
            ... on gridItem_Entry {
                title
                href
                image ${imageQuery}
                gridSize
            }
        }
    }
`;
