import { imageQuery } from "@/queries/entries/image";

export const awardsQuery = ({ visibility, categories, locale = "nl" }) => {
  return `
    query MyQuery {
        awards: awardsEntries(language: "${locale}", visibility: ${visibility ? `["${visibility}"]` : `[]`}, categories: ${categories ? `["${categories}"]` : `[]`}) {
            ...on award_Entry {
            title
            description
            image: awardimage ${imageQuery}
            categories
            }
          }
  }
`;
};
