import { imageQuery } from "@/queries/entries/image";

export const awardsQuery = ({ grade }) => `
    query MyQuery {
        awards: awardsEntries(limit: 9) {
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
