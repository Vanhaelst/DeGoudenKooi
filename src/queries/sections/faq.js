export const faqQuery = ({ categories, filters, language = "nl" }) => `
  query MyQuery {
      faq: faqEntries(language: "${language}", categories: "${categories}" ${filters ? `, filters: "${filters}"` : ""}) {
        ... on faq_Entry {
          title
          description
          categories
        }
      }
    }

`;
