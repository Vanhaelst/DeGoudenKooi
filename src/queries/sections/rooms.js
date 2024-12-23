import { imageQuery } from "@/queries/entries/image";

export const roomsQuery = ({ type }) => `
  query MyQuery {
      rooms: roomsEntries {
          ... on game_Entry {
              title
              story
              featuredImage ${imageQuery}
              time
              players
              slug
              price2
              price3
              price4
              price5
              price6
          }
      }
  }
`;
