import { fetchData, REVALIDATE } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import {
  defaultMetadata,
  getAlternates,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";
import { SeoQuery } from "@/queries/sections/seo";
import ImageWrapper from "@/components/organisms/transparentImage-wrapper";
import { PageJsonLdScript } from "@/utils/jsonLd";

async function getPage({ language, token }) {
  return fetchData(
    PageQuery({ page: "dealsRestaurantEntries", language }),
    {
      revalidate: REVALIDATE,
      tags: [`page-dealsRestaurantEntries`, `language-${language}`],
    },
    token,
  );
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "dealsRestaurantEntries", language: params.locale }),
    {
      revalidate: REVALIDATE,
      tags: [`metadata-dealsRestaurantEntries`, `language-${params.locale}`],
    },
  );

  const { seoTitle, seoDescription, seoKeywords, seoImage } = page?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    alternates: getAlternates({ locale: params.locale, path: "hapje-eten" }),
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
  const path = params.locale === "en" ? "grab-a-bite" : "hapje-eten";

  return (
    <ImageWrapper image={transparentImage}>
      <PageJsonLdScript
        locale={params.locale}
        path={path}
        page={currentPage}
        breadcrumbName="Restaurant deals"
      />
      {sections?.map((section) => renderComponents(section, params.locale))}
    </ImageWrapper>
  );
}
