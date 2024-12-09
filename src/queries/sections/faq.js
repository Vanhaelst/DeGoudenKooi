export const faqQuery = ({ categories }) => `
  query MyQuery {
      faq: faqEntries(categories: "${categories}") {
        ... on faq_Entry {
          title
          description
          categories
        }
      }
    }

`;
