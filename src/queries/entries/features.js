import { imageQuery } from "@/queries/entries/image";

export const featuresEntry = `
    ... on features_Entry {
        typeHandle
              id
        title
        description
        backgroundColor
        features {
             ... on feature_Entry {
                 title
                 description
                 icon: featureIcon ${imageQuery}
             }
        }
    }
`;
