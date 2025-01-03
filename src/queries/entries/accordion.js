export const accordionEntry = `
    ... on accordion_Entry {
              typeHandle
              backgroundColor
              title
              description
              faq: accordeonItems {
                ... on accordeonItem_Entry {
                  id
                  title
                  description
                }
              }
            }
`;
