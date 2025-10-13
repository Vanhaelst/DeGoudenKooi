import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import { defaultMetadata } from "@/data/metadata";

async function getPage({ language, token }) {
  return fetchData(PageQuery({ page: "privacyEntries", language }), {}, token);
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Privacy - De Gouden Kooi",
        description:
          "Privacy ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Privacy ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Privacy - De Gouden Kooi",
        description:
          "Privacy ✓ Informeel en leerzaam ✓ Meetings en bedrijfspresentaties ✓ Escape games.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Privacy ✓ Informeel en leerzaam ✓ Meetings en bedrijfspresentaties ✓ Escape games.",
        },
      };
}

export default async function Home({ params, searchParams }) {
  const { page } = await getPage({
    language: params.locale,
    token: searchParams["x-craft-live-preview"],
  });

  const sections = page[0]?.sections;

  return sections?.map((section) => renderComponents(section, params.locale));
}
