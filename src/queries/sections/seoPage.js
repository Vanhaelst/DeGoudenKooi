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
import { imageQuery } from "@/queries/entries/image";
import { newsletterEntry } from "@/queries/entries/newsletter";
import { codeEntry } from "@/queries/entries/code";

export const SeoQuery = ({ url, language }) => {
  const locale = language === "undefined" ? "nl" : language;
  return `
    query MyQuery {
      page: seoPagesEntries(slug:"${url}", language: "${locale}") {
        ... on page_Entry  {
          id
          transparentImage ${imageQuery}
          sections {
            ${heroEntry}
            ${awardsEntry}
            ${featuresEntry}
            ${faqEntry}
            ${callToActionEntry}
            ${contentEntry}
            ${codeEntry}
            ${RoomSliderEntry}
            ${gridEntry}
            ${gameOverviewEntry}
            ${lightboxEntry}
            ${teamEntry}
            ${videoEntry}
            ${newsletterEntry}
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
