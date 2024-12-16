import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const SeoQuery = ({ url }) => {
  return `
    query MyQuery {
      page: seoPagesEntries(slug:"hotel-deals") {
        ... on seoPage_Entry {
          title          
          heroTitle
          heroDescription
          heroImage: image ${imageQuery}
          heroType
          awardsStatus
          heroButtons: buttons ${buttonsQuery}
        }
      }
    }
  `;
};
