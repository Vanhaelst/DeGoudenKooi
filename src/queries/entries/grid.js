import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const gridEntry = `
    ... on grid_Entry {
        typeHandle
        title
        description
        backgroundColor
        gridItems {
            ... on gridItem_Entry {
                title
                description
                buttons ${buttonsQuery}
                image ${imageQuery}
                gridSize
                isBackgroundAsset
            }
        }
    }
`;
