import { seoEntry } from "@/queries/entries/seo";

export const SeoQuery = ({ page, language = "nl" }) => {
  return `
    query MyQuery {
      page: ${page}(language: "${language}") {
        ... on page_Entry {
          id
          ${seoEntry}
        }
      }
    }
`;
};
