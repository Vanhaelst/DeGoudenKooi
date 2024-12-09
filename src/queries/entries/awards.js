import { imageQuery } from "@/queries/entries/image";

export const awardsQuery = ({ klasse }) => `
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
