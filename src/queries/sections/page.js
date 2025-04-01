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
import { accordionEntry } from "@/queries/entries/accordion";
import { seoEntry } from "@/queries/entries/seo";
import { videoEntry } from "@/queries/entries/video";
import { bannerEntry } from "@/queries/entries/banner";
import { imageQuery } from "@/queries/entries/image";
import { contactFormEntry } from "@/queries/entries/contactform";
import { newsletterEntry } from "@/queries/entries/newsletter";

export const PageQuery = ({ page, language = "nl" }) => {
  const locale = language === "undefined" ? "nl" : language;

  return `
    query MyQuery {
      page: ${page}(language: "${locale}") {
        ... on page_Entry {
          id
          ${seoEntry}
          transparentImage ${imageQuery}
          sections {
            ${heroEntry}
            ${awardsEntry}
            ${contactFormEntry}
            ${featuresEntry}
            ${faqEntry}
            ${callToActionEntry}
            ${contentEntry}
            ${RoomSliderEntry}
            ${gridEntry}
            ${gameOverviewEntry}
            ${lightboxEntry}
            ${teamEntry}
            ${accordionEntry}
            ${videoEntry}
            ${bannerEntry}
            ${newsletterEntry}
          }
        }
      }
    }
`;
};
