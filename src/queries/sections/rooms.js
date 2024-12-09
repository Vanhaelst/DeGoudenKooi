import { imageQuery } from "@/queries/entries/image";

export const roomsQuery = ({ type }) => `
  query MyQuery {
      rooms: roomsEntries {
          ... on game_Entry {
              title
              featuredImage ${imageQuery}
              time
              players
          }
      }
  }
`;
