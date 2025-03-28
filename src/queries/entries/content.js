import { buttonsQuery } from "@/queries/entries/buttons";
import { imageQuery } from "@/queries/entries/image";

export const contentEntry = `
    ... on contents_Entry {
        typeHandle
              id
        backgroundColor
        contentItem {
            ... on text_Entry {
                id
                typeHandle
                title
                center
                description
                columns
                buttons ${buttonsQuery}
            }
            ... on contentImage_Entry {
                id
                typeHandle
                title
                center
                description
                buttons ${buttonsQuery}
                image ${imageQuery}
                order
            }
            ... on fullWidthImage_Entry {
                id
                typeHandle
                title
                description
                buttons ${buttonsQuery}
                image ${imageQuery}
            }
            ... on twoColumns_Entry {
              id
              typeHandle
              title
              center
              descriptionLeft
              descriptionRight
              buttonsLeft ${buttonsQuery}
              buttons ${buttonsQuery}
            }
            ... on columnsWithDivider_Entry {
              id
              typeHandle
              title
              center
              column {
                ... on column_Entry {
                  id
                  heading
                  description
                  buttons ${buttonsQuery}
                }
              }
            }
        }
    }
`;
