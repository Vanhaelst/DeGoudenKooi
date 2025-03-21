import { imageQuery } from "@/queries/entries/image";

export const awardsQuery = ({ visibility, locale = "nl" }) => {
  return `
    query MyQuery {
        awards: awardsEntries(language: "${locale}", visibility: ${visibility ? `["${visibility}"]` : `[]`}) {
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
