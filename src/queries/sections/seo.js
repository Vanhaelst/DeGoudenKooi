import { seoEntry } from "@/queries/entries/seo";

export const SeoQuery = ({ page, language = "nl" }) => {
  const locale = language === "undefined" ? "nl" : language;
  return `
    query MyQuery {
      page: ${page}(language: "${locale}") {
        ... on page_Entry {
          id
          ${seoEntry}
        }
      }
    }
`;
};
