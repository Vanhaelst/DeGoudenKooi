import { heroEntry } from "@/queries/entries/hero";
import { awardsEntry } from "@/queries/entries/awards";
import { featuresEntry } from "@/queries/entries/features";
import { faqEntry } from "@/queries/entries/faq";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { RoomSliderEntry } from "@/queries/entries/roomSlider";
import { gridEntry } from "@/queries/entries/grid";
import { gameOverviewEntry } from "@/queries/entries/gameOverview";
import { contentEntry } from "@/queries/entries/content";

export const PageQuery = ({ page }) => `
    query MyQuery {
      page: ${page} {
        ... on page_Entry {
          id
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
          }
        }
      }
    }
`;
