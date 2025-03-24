export const faqQuery = ({ categories, filters }) => `
  query MyQuery {
      faq: faqEntries(categories: "${categories}" ${filters ? `, filters: "${filters}"` : ""}) {
        ... on faq_Entry {
          title
          description
          categories
        }
      }
    }

`;
