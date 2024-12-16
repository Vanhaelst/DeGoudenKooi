import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const GameOverviewQuery = () => `
    query MyQuery {
      page: gamesOverviewEntries {
        ... on overview_Entry {
          heroTitle
          heroDescription
          heroImage: image ${imageQuery}
          heroType
          awardsStatus
          heroButtons: buttons ${buttonsQuery}
          
          overviewTitle
          overviewDescription
          
          awardsTitle
          awardsDescription
          
          priceTitle
          priceDesciption
          
          gamesTitle
          gamesDescription
          
          faqTitle
          faqDescription
        }
      }
    }
`;
