import { heroEntry } from "@/queries/entries/hero";
import { awardsEntry } from "@/queries/entries/awards";
import { featuresEntry } from "@/queries/entries/features";
import { faqEntry } from "@/queries/entries/faq";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { contentImageEntry } from "@/queries/entries/contentImage";
import { RoomSliderEntry } from "@/queries/entries/roomSlider";
import { gridEntry } from "@/queries/entries/grid";
import { gameOverviewEntry } from "@/queries/entries/gameOverview";

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
            ${contentImageEntry}
            ${RoomSliderEntry}
            ${gridEntry}
            ${gameOverviewEntry}
          }
        }
      }
    }
`;
