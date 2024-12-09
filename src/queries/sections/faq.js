export const faqQuery = ({ page = "", permissions = [] }) => `
  faqEntries {
    ... on faq_Entry {
      title
      categories
      description
    }
  }
`;
