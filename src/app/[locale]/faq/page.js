import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import { defaultMetadata } from "@/data/metadata";

export const metadata = {
  title: "Faq - De Gouden Kooi",
  description: "",
  // keywords: "",
};

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "faqPageEntries", language }));
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "FAQ - De Gouden Kooi",
        description:
          "Discover everything about our escape room and escape experience. We answer all frequently asked questions. Click through and discover the answer to who, what and how.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Discover everything about our escape room and escape experience. We answer all frequently asked questions. Click through and discover the answer to who, what and how.",
        },
      }
    : {
        ...defaultMetadata,
        title: "FAQ - De Gouden Kooi",
        description:
          "Ontdek alles over onze escape room en escape experience. We beantwoorden alle veelgestelde vragen. Klik door en ontdek het antwoord op wie, wat en hoe.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Ontdek alles over onze escape room en escape experience. We beantwoorden alle veelgestelde vragen. Klik door en ontdek het antwoord op wie, wat en hoe.",
        },
      };
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });

  const sections = page[0]?.sections;

  return sections?.map((section) => renderComponents(section, params.locale));
}
