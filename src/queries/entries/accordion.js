export const accordionEntry = `
    ... on accordion_Entry {
              typeHandle
              id
              backgroundColor
              center
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
