import { imageQuery } from "@/queries/entries/image";

export const awardsQuery = ({ grade }) => `
    query MyQuery {
        awards: awardsEntries {
            ...on award_Entry {
            title
            description
            image: awardimage ${imageQuery}
            class
            categories
            }
          }          
  }  
`;
