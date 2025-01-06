import { imageQuery } from "@/queries/entries/image";

export const seoEntry = `
      seoTitle
      seoDescription
      seoKeywords
      seoUrl
      seoImage ${imageQuery}
`;
