import { imageQuery } from "@/queries/entries/image";

export const RoomSliderEntry = `
    ... on roomSlider_Entry {
        typeHandle
        id
        title
        gameType
        backgroundColor
        backgroundImage ${imageQuery}
    }
`;
