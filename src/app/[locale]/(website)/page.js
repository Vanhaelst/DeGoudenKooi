import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { SeoQuery } from "@/queries/sections/seo";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";
import {
  createJsonLd,
  JsonLdScript,
  localBusinessSchemas,
  organizationSchema,
  webpageSchema,
  websiteSchema,
} from "@/utils/jsonLd";

async function getPage({ language, token }) {
  return fetchData(
    PageQuery({ page: "homeEntries", language }),
    {
      revalidate: REVALIDATE,
      tags: [`page-homeEntries`, `language-${language}`],
    },
    token,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "homeEntries", language: params.locale || "nl" }),
  );

  const { seoTitle, seoDescription, seoKeywords, seoImage } = page?.[0] ?? {};

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
      url: defaultMetadata.openGraph.url,
      images: seoImage?.[0]?.url || defaultMetadata.openGraph.image,
    },
  };
}

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });

  const currentPage = page[0];
  const sections = currentPage?.sections;
  const transparentImage = currentPage?.transparentImage?.[0];
  const webPage = webpageSchema({ locale: params.locale, page: currentPage });
  const jsonLd = createJsonLd([
    organizationSchema(),
    websiteSchema(params.locale),
    webPage,
    ...localBusinessSchemas({
      locale: params.locale,
      description: webPage.description,
      image: webPage.image,
      url: webPage.url,
    }),
  ]);
  return (
    <ImageWrapper image={transparentImage}>
      <JsonLdScript data={jsonLd} />
      {sections?.map((section) => renderComponents(section, params.locale))}
    </ImageWrapper>
  );
}
