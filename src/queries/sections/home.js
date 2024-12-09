import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const HomeQuery = () => `
    query MyQuery {
      page: homeEntries {
        ... on home_Entry {
          heroTitle
          heroImage: image ${imageQuery}
          heroType
          awardsStatus
          heroButtons: buttons ${buttonsQuery}
              
          bentoTitle
          bentoDescription
          games {
            ... on gameOverview_Entry {
              title
              description
              image ${imageQuery}
              buttons ${buttonsQuery}
              isBackgroundAsset
            }
          }
          
          awardsTitle
          awardsDescription
          
          featuresTitle
          featuresDescription
          features {
            ... on feature_Entry {
              title
              description
              icon: featureIcon ${imageQuery}
            }
          }
          
          gamesTitle
          gamesDescription
          
          faqTitle: FaqTitle
          faqDescription
        }
      }
    }

`;
