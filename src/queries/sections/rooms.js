import { imageQuery } from "@/queries/entries/image";
import { GAMETYPE } from "@/enums/gameTypes";
import { LOCATIONS } from "@/enums/locations";

export const roomsQuery = ({
  type = `"${GAMETYPE.GAME}", "${GAMETYPE.EXPERIENCE}", "${GAMETYPE.WALK}"`,
  location = `"${LOCATIONS.GERECHTSTRAAT}", "${LOCATIONS.HAVERWERF}"`,
  language = "nl",
}) => {
  const locale = language === "undefined" ? "nl" : language;

  return `
          query MyQuery {
              rooms: roomsEntries(language: "${locale}", gameType: [${type}], gameLocation: [${location}]) {
                  ... on game_Entry {
                      id
                      title
                      story
                      icon: iconImage ${imageQuery}
                      background ${imageQuery}
                      featuredImage ${imageQuery}
                      detailImage ${imageQuery}
                      gameLocation
                      gameType
                      time
                      players
                      categories
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
