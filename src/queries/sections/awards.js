import { imageQuery } from "@/queries/entries/image";

export const awardsQuery = ({ grade }) => `
    query MyQuery {
        awards: awardsEntries {
            ...on award_Entry {
            title
            image: awardimage ${imageQuery}
            class
            }
          }          
  }  
`;
