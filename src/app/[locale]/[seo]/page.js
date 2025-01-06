import { redirect } from "next/navigation";
import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { SeoQuery } from "@/queries/sections/seoPage";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";

async function getPage({ language, url }) {
  return fetchData(SeoQuery({ url, language }));
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `query MyQuery {
      page: seoPagesEntries(slug:"${params.seo}", , language: "${params.locale}") {
        ... on page_Entry {
          id
          ${seoEntry}
        }
      }
    }`,
  );

  const { seoTitle, seoDescription, seoKeywords, seoUrl, seoImage } = page?.[0];

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    title: seoTitle || defaultMetadata.title,
    description: seoDescription || metaData.description,
    keywords: seoKeywords || metaData.keywords,
    images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,

    openGraph: {
      ...defaultMetadata.openGraph,
      title: seoTitle || defaultMetadata.title,
      description: seoDescription || metaData.description,
      url: seoUrl || defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale, url: params.seo });

  const sections = page[0]?.sections;

  if (page.length === 0) {
    redirect(`/${params.locale}/not-found`);
  }
  return sections?.map((section) => renderComponents(section, params.locale));
}
