import { imageQuery } from "@/queries/entries/image";

export const seoEntry = `
      seoTitle
      seoDescription
      seoKeywords
      seoImage ${imageQuery}
`;
