import { imageQuery } from "@/queries/entries/image";

export const awardsQuery = ({
  visibility,
  categories,
  locale = "nl",
  limit,
  offset,
}) => {
  return `
    query MyQuery {
        awards: awardsEntries(
          language: "${locale}", 
          visibility: ${visibility ? `["${visibility}"]` : `[]`}, 
          categories: ${categories ? `["${categories}"]` : `[]`} 
          ${limit ? `limit: ${limit}` : ``}
          ${offset ? `offset: ${offset}` : ``}
        ) {
            ...on award_Entry {
            title
            description
            image: awardimage ${imageQuery}
            categories
            }
          }
          count: entryCount(language: "${locale}", section: "awards", visibility: ${visibility ? `["${visibility}"]` : `[]`}, )
  }
`;
};
