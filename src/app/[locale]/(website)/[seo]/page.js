import { redirect } from "next/navigation";
import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { SeoQuery } from "@/queries/sections/seoPage";
import {
  defaultMetadata,
  getAlternates,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { seoEntry } from "@/queries/entries/seo";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";
import { PageJsonLdScript } from "@/utils/jsonLd";

async function getPage({ language, url, token }) {
  return fetchData(
    SeoQuery({ url, language }),
    { revalidate: REVALIDATE, tags: [`page-${url}`, `language-${language}`] },
    token,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    `query MyQuery {
      page: seoPagesEntries(slug:"${params.seo}", language: "${params.locale}") {
        ... on page_Entry {
          id
          ${seoEntry}
        }
      }
    }`,
    {
      revalidate: REVALIDATE,
      tags: [`metadata-${params.seo}`, `language-${params.locale}`],
    },
  );
  if (!page?.[0]) {
    return;
  }

  const { seoTitle, seoDescription, seoKeywords, seoImage } = page?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    alternates: getAlternates({ locale: params.locale, path: params.seo }),
    title: seoTitle || defaultMetadata.title,
    description: seoDescription || metaData.description,
    keywords: seoKeywords || metaData.keywords,
    images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,

    openGraph: {
      ...defaultMetadata.openGraph,
      title: seoTitle || defaultMetadata.title,
      description: seoDescription || metaData.description,
      url: defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({
    language: params.locale,
    url: params.seo,
    token: searchParams["x-craft-live-preview"],
  });

  const currentPage = page[0];
  const sections = currentPage?.sections;

  if (page.length === 0) {
    redirect(`/${params.locale}/not-found`);
  }
  const transparentImage = currentPage?.transparentImage?.[0];

  return (
    <ImageWrapper image={transparentImage}>
      <PageJsonLdScript
        locale={params.locale}
        path={params.seo}
        page={currentPage}
        breadcrumbName={currentPage?.seoTitle || params.seo}
      />
      {sections?.map((section) => renderComponents(section, params.locale))}
    </ImageWrapper>
  );
}
