import { imageQuery } from "@/queries/entries/image";
import { GAMETYPE } from "@/enums/gameTypes";
import { LOCATIONS } from "@/enums/locations";

export const roomsQuery = ({
  type = `"${GAMETYPE.GAME}", "${GAMETYPE.EXPERIENCE}", "${GAMETYPE.WALK}"`,
  location = `"${LOCATIONS.GERECHTSTRAAT}", "${LOCATIONS.HAVERWERF}"`,
}) => {
  return `
          query MyQuery {
              rooms: roomsEntries(gameType: [${type}], gameLocation: [${location}]) {
                  ... on game_Entry {
                      title
                      story
                      featuredImage ${imageQuery}
                      detailImage ${imageQuery}
                      gameLocation
                      gameType
                      time
                      players
                      slug: uri
                      price2
                      price3
                      price4
                      price5
                      price6
                      videoPlayer
                      videoId
                  }
              }
          }
        `;
};
