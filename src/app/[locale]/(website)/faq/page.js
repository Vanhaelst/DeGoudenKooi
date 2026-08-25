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
import { faqQuery } from "@/queries/sections/faq";
import {
  breadcrumbSchema,
  createJsonLd,
  faqPageSchema,
  JsonLdScript,
  webpageSchema,
} from "@/utils/jsonLd";

async function getPage({ language, token }) {
  return fetchData(
    PageQuery({ page: "faqPageEntries", language }),
    {
      revalidate: REVALIDATE,
      tags: [`page-faqPageEntries`, `language-${language}`],
    },
    token,
  );
}

async function getFaqItems({ sections = [], locale }) {
  const embeddedItems = sections
    .filter((section) => section?.typeHandle === "accordion")
    .flatMap((section) => section.faq || []);
  const filteredSections = sections.filter(
    (section) => section?.typeHandle === "faqs",
  );
  const fetchedItems = await Promise.all(
    filteredSections.map(async ({ categories, filters }) => {
      const { faq = [] } = await fetchData(
        faqQuery({ categories, filters, language: locale }),
        {
          revalidate: REVALIDATE,
          tags: [`faq-faqsEntries`, `language-${locale}`],
        },
      );

      return faq;
    }),
  );
  const uniqueItems = new Map();

  [...embeddedItems, ...fetchedItems.flat()].forEach((item) => {
    if (item?.title && item?.description) {
      uniqueItems.set(`${item.title}:${item.description}`, item);
    }
  });

  return [...uniqueItems.values()];
}

export async function generateMetadata({ params }) {
  const { page } = await fetchData(
    SeoQuery({ page: "faqPageEntries", language: params.locale }),
    {
      revalidate: REVALIDATE,
      tags: [`metadata-faqPageEntries`, `language-${params.locale}`],
    },
  );

  const { seoTitle, seoDescription, seoKeywords, seoImage } = page?.[0] ?? {};

  const metaData = params.locale === "en" ? englishMetadata : dutchMetadata;
  return {
    ...defaultMetadata,
    alternates: getAlternates({ locale: params.locale, path: "faq" }),
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
  const faqItems = await getFaqItems({ sections, locale: params.locale });
  const webPage = webpageSchema({
    locale: params.locale,
    path: "faq",
    page: currentPage,
    type: "FAQPage",
  });
  const jsonLd = createJsonLd([
    {
      ...webPage,
      ...faqPageSchema({ url: webPage.url, items: faqItems }),
    },
    breadcrumbSchema({
      locale: params.locale,
      items: [{ name: "FAQ", url: webPage.url }],
    }),
  ]);

  return (
    <ImageWrapper image={transparentImage}>
      <JsonLdScript data={jsonLd} />
      {sections?.map((section) => renderComponents(section, params.locale))}
    </ImageWrapper>
  );
}
