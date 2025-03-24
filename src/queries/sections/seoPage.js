import { heroEntry } from "@/queries/entries/hero";
import { awardsEntry } from "@/queries/entries/awards";
import { featuresEntry } from "@/queries/entries/features";
import { faqEntry } from "@/queries/entries/faq";
import { callToActionEntry } from "@/queries/entries/callToAction";
import { contentEntry } from "@/queries/entries/content";
import { RoomSliderEntry } from "@/queries/entries/roomSlider";
import { gridEntry } from "@/queries/entries/grid";
import { gameOverviewEntry } from "@/queries/entries/gameOverview";
import { lightboxEntry } from "@/queries/entries/lightbox";
import { teamEntry } from "@/queries/entries/team";
import { videoEntry } from "@/queries/entries/video";

export const SeoQuery = ({ url, language }) => {
  const locale = language === "undefined" ? "nl" : language;
  return `
    query MyQuery {
      page: seoPagesEntries(slug:"${url}") {
        ... on page_Entry  {
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
            ${lightboxEntry}
            ${teamEntry}
            ${videoEntry}
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
