import { heroEntry } from "@/queries/entries/hero";
import { awardsEntry } from "@/queries/entries/awards";
import { featuresEntry } from "@/queries/entries/features";
import { faqEntry } from "@/queries/entries/faq";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { RoomSliderEntry } from "@/queries/entries/roomSlider";
import { gridEntry } from "@/queries/entries/grid";
import { gameOverviewEntry } from "@/queries/entries/gameOverview";
import { contentEntry } from "@/queries/entries/content";
import { lightboxEntry } from "@/queries/entries/lightbox";
import { teamEntry } from "@/queries/entries/team";
import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const FixedPageQuery = ({ page, language = "nl" }) => {
  return `
    query MyQuery {
      page: ${page}(language: "${language}") {
        ... on FixedPage_Entry {
          id
          backgroundColor
          title
          description
          backgroundImage ${imageQuery}
          image ${imageQuery}
          type: heroType
          buttons ${buttonsQuery}
          sections {
            ${heroEntry}
            ${awardsEntry}
            ${featuresEntry}
            ${faqEntry}
            ${callToActionEntry}
            ${contentEntry}
            ${RoomSliderEntry}
            ${gridEntry}
            ${gameOverviewEntry}
            ${lightboxEntry}
            ${teamEntry}
            ... on accordion_Entry {
              typeHandle
              backgroundColor
              title
              description
              faq: accordeonItems {
                ... on accordeonItem_Entry {
                  id
                  title
                  description
                }
              }
            }
          }
        }
      }
    }
`;
};
